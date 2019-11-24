import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import uuidv1 from 'uuid/v1';
import dotenv from 'dotenv';
import server from '../server';
import User from '../models/user';
import helper from '../controllers/helper';

dotenv.config();

process.env.NODE_ENV = 'test';


const { deleteAllUsers, save } = User;
const { hashPassword, generateToken } = helper;

chai.use(chaiHttp);

describe('auth', () => {
  describe('POST /api/v1/auth/create-user', () => {
    const id1 = uuidv1();
    const obj = generateToken({ sub: id1, role: 'ADMIN' });
    const token = `Bearer ${obj}`;
    // before(async () => {


    // });

    after(async () => {
      await deleteAllUsers();
    });
    
    it('should create a new user', async () => {
      const values = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
      await save(values);
      const objt = { sub: id1, role: 'ADMIN' };
      const autht = generateToken(objt);
      const tokent = `Bearer ${autht}`;

      const user1 = {
        firstName: 'Dante',
        lastName: 'kamau',
        email: 'danielmukuna@gmail.com', 
        password: "DANIEL12345", 
        gender: 'Male', 
        jobRole: 'admin', 
        department: 'I.T', 
        address: 'Thika'
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', tokent)
        .set('Content-Type', 'application/json')
        .send(user1);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if email field is empty', async () => {
      const  user2 = {
        firstName: "Daniel",
        lastName: "Mukuna",
        email: "", 
        password: "DANIEL12345", 
        gender: "Male", 
        jobRole: "admin", 
        department: "I.T", 
        address: "Thika"
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(user2);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if user supply invalid email', async () => {
      const user3 = {
        firstName: "Daniel",
        lastName: "Mukuna",
        email: 'danielmukuna', 
        password: "DANIEL12345", 
        gender: "Male", 
        jobRole: "admin", 
        department: "I.T", 
        address: "Thika"
      };
 
      const res = await chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(user3);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if a duplicate email is found', async () => {
      const user4 = {
        firstName: "Grace",
        lastName: "Kamau",
        email: "daniel@mukuna.com", 
        password: "DANIEL12345", 
        gender: "feMale", 
        jobRole: "admin", 
        department: "I.T", 
        address: "Thika"
      };
      
      const res = await chai.request(server)
        .post('/api/v1/auth/create-user')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(user4);
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

  });

  
  describe('POST /api/v1/auth/signin', () => {
    const id2 = uuidv1();
    before(async () => {
      const values = [id2, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
      await save(values);
    });
    after(async () => {
      await deleteAllUsers();
    })
    it('should login a user into the application', async () => {
      const user6 = {
        email: "daniel@mukuna.com",
        password: "DANIEL12345"
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Content-Type', 'application/json')
        .send(user6);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('success');
    });

    it('should fail if password is incorrect', async () => {
      const user7 = {
        email: "daniel@mukuna.com",
        password: "DANIEL12574345"
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Content-Type', 'application/json')
        .send(user7);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if email field is empty', async () => {
      const user8 = {
        email: "",
        password: "DANIEL12345"
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Content-Type', 'application/json')
        .send(user8);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if user supply invalid email', async () => {
      const user9 = {
        email: "daniel.mukunacom",
        password: "DANIEL1254345"
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Content-Type', 'application/json')
        .send(user9);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });

    it('should fail if a password is not supplied', async () => {
      const user10 = {
        email: "daniel.mukunacom",
        password: ""
      };
      const res = await chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Content-Type', 'application/json')
        .send(user10);
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('Object');
        expect(res.body.status).to.be.equals('error');
    });
  });
});
