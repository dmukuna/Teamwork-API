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
    await deleteAllGifs();
    await deleteAllArticles();
    await deleteAllUsers();
  });

  describe('GET /api/v1/feeds', () => {
    it('should fetch all articles and gifs', async () => {
      const res = await chai.request(server)
        .get('/api/v1/feed')
        .set('Authorization', token)
        .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.status).to.be.equals('success');
    });
  });
});
