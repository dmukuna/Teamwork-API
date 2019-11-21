import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import { after, before } from 'mocha';
import app from '../app';
import db from '../db';
import gifs from '../seeders/gifs';
import model from '../models/index';
import pool from '../config';
import Helper from '../controllers/helper';

const {
  createUsersTable, dropUsersTable, createGifsTable, dropGifsTable,
} = db;
const {
  gif, gif1, gif2, gif3, gif4,
} = gifs;
const { query } = model;

dotenv.config();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Articles', () => {
  before(() => {
    createUsersTable();
    createGifsTable();
  });

  after(() => {
    dropGifsTable();
    dropUsersTable();
    // pool.end();
  });

  describe('POST /api/v1/gifs', () => {
    it('should create a new gifs', () => {
      chai.request(app)
        .post('/api/v1/gifs')
        .send(gif)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('gifs successfully created');
        });
    });

    it('should fail if the gifs url is blank', () => {
      chai.request(app)
        .post('/api/v1/gifs')
        .send(gif1)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.error).to.be.equals('gifs url is required');
        });
    });

    it('should fail if the gifs title is blank', () => {
      chai.request(app)
        .post('/api/v1/gifs')
        .send(gif2)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.error).to.be.equals('gifs title is required');
        });
    });

    it('should fail if the gifs authorID is blank', () => {
      chai.request(app)
        .post('/api/v1/gifs')
        .send(gif3)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.error).to.be.equals('gifs authorID is required');
        });
    });
  });

  describe('GET /api/v1/gifs', () => {
    it('should fetch all gifs', () => {
      chai.request(app)
        .get('/api/v1/gifs')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });

  describe('GET /api/v1/gifs/:gifID', () => {
    it('should fetch get one gif', () => {
      chai.request(app)
        .get('/api/v1/gifs/:gifID')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });

  describe('PATCH /api/v1/gifs/:gifID', () => {
    it('should update a gif url ', () => {
      chai.request(app)
        .patch('/api/v1/gifs/:gifID')
        .send(gif4)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });

  describe('DELETE /api/v1/gifs/:gifID', () => {
    it('should delete one gif', () => {
      chai.request(app)
        .delete('/api/v1/gifs/:gifID')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.data).to.be.an('Object');
          expect(res.msg).to.be.equals('success');
        });
    });
  });
});
