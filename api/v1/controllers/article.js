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

const getArticleController = (req, res, next) => {
  if (!req.params.articleId || req.params.articleId === '') {
    res.status(400).json({
      status: 'error',
      Error: 'Invalid request',
    });
  } else {
    const paramId = parseInt(req.params.articleId, 10);

    findOneArticle([paramId])
      .then((row) => {
        const {
          id, title, article, createdon, authorid,
        } = row;
        const articleId = id;
        const articleTitle = title;
        const articleText = article;
        const articleCreatedOn = createdon;
        const articleAuthorId = authorid;

        findArticleComments([paramId])
          .then((rows) => {
            const commentArr = [];
            rows.forEach((commentRow) => {
              const { comment } = commentRow;
              const commentText = comment;
              const commentAuthorId = commentRow.authorid;

              const values = {
                commentId: commentRow.id,
                comment: commentText,
                authorId: commentAuthorId,
              };
              commentArr.push(values);
            });
            res.status(200).json({
              status: 'success',
              data: {
                id: articleId,
                createdOn: articleCreatedOn,
                title: articleTitle,
                article: articleText,
                authorId: articleAuthorId,
                comments: commentArr,
              },
            });
          })
          .catch(() => {
            res.status(500).json({
              status: 'error',
              Error: 'Failed to get article comments',
            });
          });
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          Error: 'Failed to get article',
        });
      });
  }
};

export {
  createArticleController,
  getArticlesController,
  getArticleController,
  updateArticleController,
  deleteArticleController,
};