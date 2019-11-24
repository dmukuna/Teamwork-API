"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _moment = _interopRequireDefault(require("moment"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _gif = _interopRequireDefault(require("../models/gif"));

var _article = _interopRequireDefault(require("../models/article"));

var findAllComments = _comment["default"].findAllComments,
    saveGifComment = _comment["default"].saveGifComment,
    saveArticleComment = _comment["default"].saveArticleComment;
var findOneArticle = _article["default"].findOneArticle;
var findOneGif = _gif["default"].findOneGif;

var createCommentController = function createCommentController(req, res, next) {
  var checkFields = !req.body.comment || req.body.comment === '';

  if (checkFields) {
    res.status(400).json({
      status: 'error',
      error: 'Invalid request'
    });
  } else {
    var comment = req.body.comment;
    var commentText = comment;
    var commentCreatedOn = (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss');
    var authorId = req.user.sub;
    findAllComments().then(function (rows) {
      var commentId = Math.max.apply(Math, (0, _toConsumableArray2["default"])(rows.map(function (row) {
        return row.id + 1;
      })).concat([1]));

      if (req.params.gifId) {
        var gifId = parseInt(req.params.gifId, 10);
        findOneGif([gifId]).then(function (row) {
          var title = row.title;
          saveGifComment([commentId, comment, commentCreatedOn, authorId, gifId]).then(function () {
            res.status(201).json({
              status: 'success',
              data: {
                message: 'Comment successfully created',
                createdOn: commentCreatedOn,
                gifTitle: title,
                comment: commentText,
                userId: authorId
              }
            });
          })["catch"](function () {
            res.status(500).json({
              status: 'error',
              error: 'Failed to save comment'
            });
          });
        })["catch"](function () {
          res.status(500).json({
            status: 'error',
            error: 'Failed to get GIF image'
          });
        });
      } else if (req.params.articleId) {
        var articleId = parseInt(req.params.articleId, 10);
        findOneArticle([articleId]).then(function (row) {
          var title = row.title,
              article = row.article;
          var articleText = article;
          saveArticleComment([commentId, comment, commentCreatedOn, authorId, articleId]).then(function () {
            res.status(201).json({
              status: 'success',
              data: {
                message: 'Comment successfully created',
                id: commentId,
                createdOn: commentCreatedOn,
                articleTitle: title,
                article: articleText,
                comment: commentText,
                userId: authorId
              }
            });
          })["catch"](function () {
            res.status(500).json({
              status: 'error',
              error: 'Failed to save Article comment'
            });
          });
        })["catch"](function () {
          res.status(500).json({
            status: 'error',
            error: 'Failed to get Article'
          });
        });
      } else {
        res.status(400).json({
          status: 'error',
          Error: 'Invalid request'
        });
      }
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        Error: 'Failed to get comments'
      });
    });
  }
};

var _default = createCommentController;
exports["default"] = _default;
//# sourceMappingURL=comment.js.map