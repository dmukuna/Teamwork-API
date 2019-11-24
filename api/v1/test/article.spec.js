import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import server from '../server';
import Article from '../models/article';
import User from '../models/user';
import helper from '../controllers/helper';

dotenv.config();

process.env.NODE_ENV = 'test';

const { save, deleteAllUsers } = User;
const { deleteAllArticles, saveArticle } = Article;
const { hashPassword, generateToken } = helper;

chai.use(chaiHttp);

describe('Articles', () => {
  const id1 = uuidv1();
  const obj = generateToken({ sub: id1, role: 'ADMIN' });
  const token = `Bearer ${obj}`;
  before(async () => {
    const articleTitle = 'First test title';
    const articleText = 'First test article test';
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const userValues = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
    const articleValues = [1, articleTitle, articleText, date, id1];
    await save(userValues);
    await saveArticle(articleValues);
  });

  after(async () => {
    await deleteAllArticles();
    await deleteAllUsers();
  });

  describe('POST /api/v1/articles', () => {
    it('should create a new article', async () => {
      const article1 = {
        title: 'first article',
        article: 'first article text'
      };
      const res = await chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(article1);
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if the article body is blank', async () => {
      const article2 = {
        title: 'first article',
        article: ''
      };
      const res = await chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(article2);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if the article title is blank', async () => {
      const article3 = {
        title: '',
        article: 'first article text'
      };
      const res = await chai.request(server)
        .post('/api/v1/articles')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(article3)
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });

  describe('GET /api/v1/articles', () => {
    it('should fetch all articles', async () => {
      const res = await chai.request(server)
        .get('/api/v1/articles')
        .set('Authorization', token);
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.be.equals('success');
    });
  });

  describe('GET /api/v1/articles/:articleID', () => {
    it('should fetch get one article', async () => {
      const res = await chai.request(server)
        .get('/api/v1/articles/1')
        .set('Authorization', token);
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('Object');
        expect(res.body.data.comments).to.be.an('array');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if article does not exist', async () => {
      const res = await chai.request(server)
        .get('/api/v1/articles/5')
        .set('Authorization', token);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });

  describe('PATCH /api/v1/articles/:articleID', () => {
    it('should update an article', async () => {
      const article4 = {
        title: 'updated first article',
        article: 'updated first article text'
      };
      const res = await chai.request(server)
        .patch('/api/v1/articles/1')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(article4);
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if article does not exist', async () => {
      const article5 = {
        title: 'updated first article',
        article: 'updated first article text'
      };
      const res = await chai.request(server)
        .patch('/api/v1/articles/5')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(article5);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });

  describe('DELETE /api/v1/articles/:articleId', () => {
    it('should delete one article', async () => {
      const res = await chai.request(server)
        .delete('/api/v1/articles/1')
        .set('Authorization', token);
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if article does not exist', async () => {
      const res = await chai.request(server)
        .delete('/api/v1/articles/6')
        .set('Authorization', token);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });
});
