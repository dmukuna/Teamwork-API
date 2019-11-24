import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import dotenv from 'dotenv';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import server from '../server';
import Gif from '../models/gif';
import User from '../models/user';
import helper from '../controllers/helper';

dotenv.config();

process.env.NODE_ENV = 'test';

const { hashPassword, generateToken } = helper;
const { save, deleteAllUsers } = User;
const { saveGif, deleteAllGifs } = Gif;

chai.use(chaiHttp);

describe('Gifs', () => {
  const id1 = uuidv1();
  const obj = generateToken({ sub: id1, role: 'EMPLOYEE' });
  const token = `Bearer ${obj}`;
  before(async () => {
    const gifTitle = 'First gif test value';
    const gUrl = 'http://res.cloudinary.com/mukuna/image/upload/v1574479438/teamwork-api-gifs/utvsco0pt6suogvzfbu9.gif';
    const p_id = 'teamwork-api-gifs/utvsco0pt6suogvzfbu9';
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const userValues = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
    const gifValues = [1, gifTitle, gUrl, p_id, date, id1];
    await save(userValues);
    await saveGif(gifValues);
  });

  after(async () => {
    await deleteAllGifs();
    await deleteAllUsers();
  });

  describe('POST /api/v1/gifs', () => {
    it('should create a new gifs', async () => {
      const gif1 = {
        title: 'test title'
      };
      const gifUrl = './api/v1/test/211552610004202.gif';
      const res = await chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .attach('image', gifUrl)
        .field(gif1);
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if the gifs url is blank', async () => {
      const gif2 = {
        title: 'test title'
      };
      const gifUrl2 = '';
      const res = await chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .attach('image', gifUrl2)
        .field(gif2);
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if the gifs title is blank', async () => {
      const gif3 = {
        title: ''
      };
      const gifUrl3 = './api/v1/test/211552610004202.gif';
      const res = await chai.request(server)
        .post('/api/v1/gifs')
        .set('Authorization', token)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .attach('image', gifUrl3)
        .field(gif3);
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equals('error');
    });
  });

  describe('GET /api/v1/gifs', () => {
    it('should fetch all gifs', async () => {
      const res = await chai.request(server)
        .get('/api/v1/gifs')
        .set('Authorization', token);
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.be.equals('success');
    });
  });

  describe('GET /api/v1/gifs/:gifId', () => {
    it('should fetch get one gif', async () => {
      const res = await chai.request(server)
        .get('/api/v1/gifs/1')
        .set('Authorization', token);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if gif does not exist', async () => {
      const res = await chai.request(server)
        .get('/api/v1/gifs/5')
        .set('Authorization', token);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });

  describe('DELETE /api/v1/gifs/:gifId', () => {
    it('should delete one gif', async () => {
      const res = await chai.request(server)
        .delete('/api/v1/gifs/1')
        .set('Authorization', token)
        .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if gif does not exist', async () => {
      const res = await chai.request(server)
        .delete('/api/v1/gifs/5')
        .set('Authorization', token);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });
});
