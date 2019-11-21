import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import { after, before } from 'mocha';
import app from '../app';
import db from '../db';
import model from '../models/index';

const {
  createUsersTable, dropUsersTable, createArticlesTable, dropArticlesTable,
  createGifsTable, dropGifsTable, createCommentsTable, dropCommentsTable,
} = db;
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

  describe('GET /api/v1/feeds', () => {
    it('should fetch all articles and gifs', () => {
      chai.request(app)
        .get('/api/v1/feeds')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });
});
