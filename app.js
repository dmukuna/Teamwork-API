import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

module.exports = app;
