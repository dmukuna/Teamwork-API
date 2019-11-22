import moment from 'moment';
import artcl from '../models/article';
import comnt from '../models/comment';

const {
  findOneArticle, findAllArticles, updateArticle, saveArticle, deleteArticle,
} = artcl;
const { findArticleComments } = comnt;

const createArticleController = (req, res, next) => {
  const checkFields = !req.body.article || !req.body.title || req.body.title === '' || req.body.article === '';
  if (checkFields) {
    res.status(400).json({
      status: 'error',
      Error: 'Title and Article text are required',
    });
  } else {
    findAllArticles()
      .then((rows) => {
        const { title, article } = req.body;
        const authorId = req.user.sub;
        const articleCreatedOn = moment().format('YYYY-MM-DD HH:mm:ss');
        let articleId;
        if (rows.length === 0) {
          articleId = 1;
        } else {
          articleId = rows[rows.length - 1].id + 1;
        }
        const articleTitle = title;

        const values = [articleId, title, article, articleCreatedOn, authorId];

        saveArticle(values)
          .then(() => {
            res.status(201).json({
              status: 'success',
              data: {
                id: articleId,
                message: 'Article successfully posted',
                createdOn: articleCreatedOn,
                title: articleTitle,
                userId: authorId,
              },
            });
          })
          .catch(() => {
            res.status(500).json({
              status: 'error',
              error: 'Did not post article',
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          Error: 'Did not get articles',
        });
      });
  }
};

const getArticlesController = (req, res, next) => {
  findAllArticles()
    .then((rows) => {
      if (rows.length === 0) {
        res.status(400).json({
          status: 'error',
          Error: 'There is no Article post yet',
        });
      } else {
        const articlesArr = [];
        rows.forEach((a) => {
          const {
            id, title, article, createdOn, authorId,
          } = a;
          const articleId = id;
          const articleTitle = title;
          const articleText = article;
          const articleCreatedOn = createdOn;

          const values = {
            id: articleId,
            title: articleTitle,
            article: articleText,
            createdOn: articleCreatedOn,
            userId: authorId,
          };
          articlesArr.push(values);
        });
        res.status(200).json({
          status: 'success',
          data: articlesArr,
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        status: 'error',
        Error: 'Did not get articles',
      });
    });
};

export {
  createArticleController,
  getArticlesController,
  getArticleController,
  updateArticleController,
  deleteArticleController,
};