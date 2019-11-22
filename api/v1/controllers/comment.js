import moment from 'moment';
import cmnt from '../models/comment';
import gf from '../models/gif';
import artcl from '../models/article';

const { findAllComments, saveGifComment, saveArticleComment } = cmnt;
const { findOneArticle } = artcl;
const { findOneGif } = gf;

const createCommentController = (req, res, next) => {
  const checkFields = !req.body.comment || req.body.comment === '';

  if (checkFields) {
    res.status(400).json({
      status: 'error',
      Error: 'Invalid request',
    });
  } else {
    const { comment } = req.body;
    const commentText = comment;
    const commentCreatedOn = moment().format('YYYY-MM-DD HH:mm:ss');
    const authorId = req.user.sub;
    findAllComments()
      .then((rows) => {
        const commentId = Math.max(...rows.map(row => row.id + 1), 1);

        if (req.params.gifId) {
          const gifId = parseInt(req.params.gifId, 10);
          findOneGif([gifId])
            .then((row) => {
              const { title } = row;

              saveGifComment([commentId, comment, commentCreatedOn, authorId, gifId])
                .then(() => {
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'Comment successfully created',
                      createdOn: commentCreatedOn,
                      gifTitle: title,
                      comment: commentText,
                      userId: authorId,
                    },
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    status: 'error',
                    error: 'Failed to save comment',
                  });
                });
            })
            .catch(() => {
              res.status(500).json({
                status: 'error',
                error: 'Failed to get GIF image',
              });
            });
        } else if (req.params.articleId) {
          const articleId = parseInt(req.params.articleId, 10);
          findOneArticle([articleId])
            .then((row) => {
              const { title, article } = row;
              const articleText = article;

              saveArticleComment([commentId, comment, commentCreatedOn, authorId, articleId])
                .then(() => {
                  res.status(201).json({
                    status: 'success',
                    data: {
                      message: 'Comment successfully created',
                      id: commentId,
                      createdOn: commentCreatedOn,
                      articleTitle: title,
                      article: articleText,
                      comment: commentText,
                      userId: authorId,
                    },
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    status: 'error',
                    error: 'Failed to save Article comment',
                  });
                });
            })
            .catch(() => {
              res.status(500).json({
                status: 'error',
                error: 'Failed to get Article',
              });
            });
        } else {
          res.status(400).json({
            status: 'error',
            Error: 'Invalid request',
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          status: 'error',
          Error: 'Failed to get comments',
        });
      });
  }
};

export default createCommentController;
