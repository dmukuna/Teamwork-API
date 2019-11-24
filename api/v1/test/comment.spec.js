import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import server from '../server';
import Gif from '../models/gif';
import User from '../models/user';
import Article from '../models/article';
import Comment from '../models/comment';
import helper from '../controllers/helper';

dotenv.config();

process.env.NODE_ENV = 'test';

const { save, deleteAllUsers } = User;
const { saveArticle, deleteAllArticles } = Article;
const { saveGif, deleteAllGifs } = Gif;
const { deleteAllComments } = Comment;

const { hashPassword, generateToken} = helper;

chai.use(chaiHttp);

describe('comments', () => {
  const id1 = uuidv1();
  const obj = generateToken({ sub: id1, role: 'EMPLOYEE' });
  const token = `Bearer ${obj}`;
  before(async () => {
    const articleTitle = 'First test title';
    const articleText = 'First test article test';
    const date = moment().format('YYYY-MM-DD HH:mm:ss');

    const userValues = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
    const articleValues = [1, articleTitle, articleText, date, id1];

    const gifTitle = 'First gif test value';
    const gUrl = 'http://res.cloudinary.com/mukuna/image/upload/v1574479438/teamwork-api-gifs/utvsco0pt6suogvzfbu9.gif';
    const p_id = 'teamwork-api-gifs/utvsco0pt6suogvzfbu9';

    const gifValues = [1, gifTitle, gUrl, p_id, date, id1];
    await save(userValues);
    await saveGif(gifValues);
    await saveArticle(articleValues);
  });

  after(async () => {
    await deleteAllComments();
    await deleteAllGifs();
    await deleteAllArticles();
    await deleteAllUsers();
  });

  describe('POST /api/v1/articles/:articleID/comments', () => {
    it('should create a new comment on the article', async () => {
      const comment1 = {
        comment: 'first article test comment'
      };
      const res = await chai.request(server)
        .post('/api/v1/articles/1/comments')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(comment1);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if the comment field is empty', async () => {
      const comment2 = {
        comment: ''
      };
      const res = await chai.request(server)
        .post('/api/v1/articles/1/comments')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(comment2);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });

  describe('POST /api/v1/gifs/:gifID/comments', () => {
    it('should create a new comment on the gif', async () => {
      const comment3 = {
        comment: 'first gif image test comment'
      };
      const res = await chai.request(server)
        .post('/api/v1/gifs/1/comments')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(comment3);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if the comment field is empty', async () => {
      const comment4 = {
        comment: ''
      };
      const res = await chai.request(server)
        .post('/api/v1/gifs/1/comments')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(comment4);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });
});
