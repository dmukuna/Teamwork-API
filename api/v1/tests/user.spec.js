import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import { after } from 'mocha';
import app from '../app';
import users from '../seeders/user';
import User from '../models/user';

const { deleteAllUsers, save } = User;

const {
  user1, user2, user3, user4, user5, user6, user7, user8, user9,
} = users;

chai.use(chaiHttp);

describe('auth', () => {
  before(() => {
    save([,,,,,,,,,,]);
  });

  after(() => {
    deleteAllUsers();
  });

  describe('POST /api/v1/auth/create-user', () => {
    it('should create a new user', () => {
      chai.request(app)
        .post('api/v1/auth/create-user')
        .send(user1)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('success');
        });
    });

    it('should fail if email field is empty', () => {
      chai.request(app)
        .post('api/v1/auth/create-user')
        .send(user2)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });

    it('should fail if user supply invalid email', () => {
      chai.request(app)
        .post('api/v1/auth/create-user')
        .send(user3)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });

    it('should fail if a duplicate email is found', () => {
      chai.request(app)
        .post('api/v1/auth/create-user')
        .send(user4)
        .then((res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });
  });

  describe('POST /api/v1/auth/signin', () => {
    it('should login a user into the application', () => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user5)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('success');
        });
    });

    it('should fail if password is incorrect', () => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user6)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });

    it('should fail if email field is empty', () => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user7)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });

    it('should fail if user supply invalid email', () => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user8)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });

    it('should fail if a password is not supplied', () => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(user9)
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('Object');
          expect(res.status).to.be.equals('error');
        });
    });
  });
});
