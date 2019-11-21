import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import { after, before } from 'mocha';
import app from '../app';
import db from '../db';
import comments from '../seeders/comments';
import model from '../models/index';

const {
  createUsersTable, dropUsersTable, createArticlesTable, dropArticlesTable,
  createGifsTable, dropGifsTable, createCommentsTable, dropCommentsTable,
} = db;
const {
  comment, comment1, comment2, comment3, comment4, comment5,
} = comments;
const { query } = model;

dotenv.config();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('comments', () => {
  before(() => {
    createUsersTable();
    createArticlesTable();
    createGifsTable();
    createCommentsTable();
  });

  after(() => {
    dropCommentsTable();
    dropGifsTable();
    dropArticlesTable();
    dropUsersTable();

    // pool.end();
  });

  describe('POST /api/v1/articles/:articleID/comments', () => {
    it('should create a new comment on the article', () => {
      chai.request(app)
        .post('/api/v1/articles/:articleID/comments')
        .send(comment)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });

    it('should fail if the articleID is not provided', () => {
      chai.request(app)
        .post('/api/v1/articles/:articleID/comments')
        .send(comment1)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('ArticleId is required');
        });
    });

    it('should fail if the authorID is not provided', () => {
      chai.request(app)
        .post('/api/v1/articles/:articleID/comments')
        .send(comment2)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('authorID is required');
        });
    });
  });

  describe('POST /api/v1/gifs/:gifID/comments', () => {
    it('should create a new comment on the gif', () => {
      chai.request(app)
        .post('/api/v1/gifs/:gifID/comments')
        .send(comment3)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });

    it('should fail if the articleID is not provided', () => {
      chai.request(app)
        .post('/api/v1/gifs/:gifID/comments')
        .send(comment4)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('ArticleId is required');
        });
    });

    it('should fail if the authorID is not provided', () => {
      chai.request(app)
        .post('/api/v1/gifs/:gifID/comments')
        .send(comment5)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('authorID is required');
        });
    });
  });
});
