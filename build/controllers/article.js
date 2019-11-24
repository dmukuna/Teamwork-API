"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteArticleController = exports.updateArticleController = exports.getArticleController = exports.getArticlesController = exports.createArticleController = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _moment = _interopRequireDefault(require("moment"));

var _article = _interopRequireDefault(require("../models/article"));

var _comment = _interopRequireDefault(require("../models/comment"));

var findOneArticle = _article["default"].findOneArticle,
    findAllArticles = _article["default"].findAllArticles,
    updateArticle = _article["default"].updateArticle,
    saveArticle = _article["default"].saveArticle,
    deleteArticle = _article["default"].deleteArticle;
var findArticleComments = _comment["default"].findArticleComments;

var createArticleController = function createArticleController(req, res, next) {
  var checkFields = !req.body.article || !req.body.title || req.body.title === '' || req.body.article === '';

  if (checkFields) {
    res.status(400).json({
      status: 'error',
      error: 'Title and Article text are required'
    });
  } else {
    findAllArticles().then(function (rows) {
      var _req$body = req.body,
          title = _req$body.title,
          article = _req$body.article;
      var authorId = req.user.sub;
      var articleCreatedOn = (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss');
      var articleId = Math.max.apply(Math, (0, _toConsumableArray2["default"])(rows.map(function (row) {
        return row.id + 1;
      })).concat([1]));
      var articleTitle = title;
      var values = [articleId, title, article, articleCreatedOn, authorId];
      saveArticle(values).then(function () {
        res.status(201).json({
          status: 'success',
          data: {
            id: articleId,
            message: 'Article successfully posted',
            createdOn: articleCreatedOn,
            title: articleTitle,
            userId: authorId
          }
        });
      })["catch"](function () {
        res.status(500).json({
          status: 'error',
          error: 'Failed to save article'
        });
      });
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        error: 'Failed to get articles'
      });
    });
  }
};

exports.createArticleController = createArticleController;

var getArticlesController = function getArticlesController(req, res, next) {
  findAllArticles().then(function (rows) {
    if (rows.length === 0) {
      res.status(400).json({
        status: 'error',
        error: 'There is no Article post yet'
      });
    } else {
      var articlesArr = [];
      rows.forEach(function (a) {
        var id = a.id,
            title = a.title,
            article = a.article,
            createdOn = a.createdOn,
            authorId = a.authorId;
        var articleId = id;
        var articleTitle = title;
        var articleText = article;
        var articleCreatedOn = createdOn;
        var values = {
          id: articleId,
          title: articleTitle,
          article: articleText,
          createdOn: articleCreatedOn,
          userId: authorId
        };
        articlesArr.push(values);
      });
      res.status(200).json({
        status: 'success',
        data: articlesArr
      });
    }
  })["catch"](function () {
    res.status(500).json({
      status: 'error',
      error: 'Failed to get articles'
    });
  });
};

exports.getArticlesController = getArticlesController;

var getArticleController = function getArticleController(req, res, next) {
  if (!req.params.articleId || req.params.articleId === '') {
    res.status(400).json({
      status: 'error',
      error: 'Invalid request'
    });
  } else {
    var paramId = parseInt(req.params.articleId, 10);
    findOneArticle([paramId]).then(function (row) {
      if (row.length === 0) {
        res.status(400).json({
          status: 'error',
          error: 'Invalid request'
        });
      } else {
        var id = row.id,
            title = row.title,
            article = row.article,
            createdon = row.createdon,
            authorid = row.authorid;
        var articleId = id;
        var articleTitle = title;
        var articleText = article;
        var articleCreatedOn = createdon;
        var articleAuthorId = authorid;
        findArticleComments([paramId]).then(function (rows) {
          var commentArr = [];
          rows.forEach(function (commentRow) {
            var comment = commentRow.comment;
            var commentText = comment;
            var commentAuthorId = commentRow.authorid;
            var values = {
              commentId: commentRow.id,
              comment: commentText,
              authorId: commentAuthorId
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
              comments: commentArr
            }
          });
        })["catch"](function () {
          res.status(500).json({
            status: 'error',
            error: 'Failed to get article comments'
          });
        });
      }
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        error: 'Failed to get article'
      });
    });
  }
};

exports.getArticleController = getArticleController;

var updateArticleController = function updateArticleController(req, res, next) {
  var checkFields = !req.params.articleId || !req.body.article || !req.body.title || req.params.articleId === '' || req.body.article === '' || req.body.title === '';

  if (checkFields) {
    res.status(400).json({
      status: 'error',
      error: 'Title and article fields are required'
    });
  } else {
    var paramId = parseInt(req.params.articleId, 10);
    findOneArticle([paramId]).then(function (row) {
      if (row.length === 0) {
        res.status(400).json({
          status: 'error',
          error: 'Article does not exist'
        });
      } else {
        updateArticle([req.body.title, req.body.article, paramId]).then(function (row) {
          var id = row.id,
              title = row.title,
              article = row.article,
              createdon = row.createdon,
              authorid = row.authorid;
          var articleId = id;
          var articleTitle = title;
          var articleText = article;
          var articleCreatedOn = createdon;
          res.status(201).json({
            status: 'success',
            data: {
              id: articleId,
              title: articleTitle,
              article: articleText,
              createdOn: articleCreatedOn,
              userId: authorid
            }
          });
        })["catch"](function () {
          res.status(500).json({
            status: 'error',
            error: 'Failed to update article'
          });
        });
      }
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        error: 'Failed to get article'
      });
    });
  }
};

exports.updateArticleController = updateArticleController;

var deleteArticleController = function deleteArticleController(req, res, next) {
  if (!req.params.articleId || req.params.articleId === '') {
    res.status(400).json({
      status: 'error',
      error: 'Invalid request'
    });
  } else {
    var articleId = parseInt(req.params.articleId, 10);
    findOneArticle([articleId]).then(function (row) {
      if (row.length === 0) {
        res.status(400).json({
          status: 'error',
          error: 'Invalid request'
        });
      } else {
        deleteArticle([articleId]).then(function (row) {
          var id = row.id,
              title = row.title,
              article = row.article,
              createdon = row.createdon,
              authorid = row.authorid;
          var articleTitle = title;
          var articleText = article;
          var articleCreatedOn = createdon;
          var userId = authorid;
          res.status(200).json({
            status: 'success',
            data: {
              message: 'Article successfully deleted',
              Id: id,
              title: articleTitle,
              article: articleText,
              createdOn: articleCreatedOn,
              authorId: userId
            }
          });
        })["catch"](function () {
          res.status(500).json({
            status: 'error',
            error: 'Failed to delete article'
          });
        });
      }
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        error: 'Failed to get article'
      });
    });
  }
};

exports.deleteArticleController = deleteArticleController;
//# sourceMappingURL=article.js.map