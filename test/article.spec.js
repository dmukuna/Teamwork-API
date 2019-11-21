import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import { after, before } from 'mocha';
import app from '../app';
import db from '../db';
import articles from '../seeders/articles';
import model from '../models/index';

const {
  createUsersTable, dropUsersTable, createArticlesTable, dropArticlesTable,
} = db;
const {
  article, article1, article2, article3, article4,
} = articles;
const { query } = model;

dotenv.config();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Articles', () => {
  before(() => {
    createUsersTable();
    createArticlesTable();
  });

  after(() => {
    dropArticlesTable();
    dropUsersTable();
    // pool.end();
  });

  describe('POST /api/v1/articles', () => {
    it('should create a new article', () => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(article)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('Article successfully created');
        });
    });

    it('should fail if the article body is blank', () => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(article1)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.error).to.be.equals('Article body is required');
        });
    });

    it('should fail if the article title is blank', () => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(article2)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.error).to.be.equals('Article title is required');
        });
    });

    it('should fail if the article authorID is blank', () => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(article3)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.error).to.be.equals('Article authorID is required');
        });
    });
  });

  describe('GET /api/v1/articles', () => {
    it('should fetch all articles', () => {
      chai.request(app)
        .get('/api/v1/articles')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });

  describe('GET /api/v1/articles/:articleID', () => {
    it('should fetch get one article', () => {
      chai.request(app)
        .get('/api/v1/articles/:articleID')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });

  describe('PATCH /api/v1/articles/:articleID', () => {
    it('should update an article', () => {
      chai.request(app)
        .patch('/api/v1/articles/:articleID')
        .send(article4)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });

  describe('DELETE /api/v1/articles/:articleID', () => {
    it('should delete one article', () => {
      chai.request(app)
        .delete('/api/v1/articles/:articleID')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });
});
