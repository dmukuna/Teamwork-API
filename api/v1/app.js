import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import gifRoutes from './routes/gif';
import articleRoutes from './routes/article';
import userRoutes from './routes/user';
import feedRoutes from './routes/feed';
import auth from './middleware/auth';
import Role from '../../config/rolesConfig';


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/articles', auth([Role.Employee, Role.Admin]), articleRoutes);
app.use('/api/v1/gifs', auth([Role.Employee, Role.Admin]), gifRoutes);
app.use('/api/v1/feed', auth([Role.Employee, Role.Admin]), feedRoutes);

module.exports = app;
