"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var query = _index["default"].query;
var Article = {
  findOneArticle: function findOneArticle(values) {
    var queryText = 'SELECT * FROM articles WHERE id=$1';
    var row = query(queryText, values).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  findAllArticles: function findAllArticles() {
    var queryText = 'SELECT * FROM articles';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  },
  updateArticle: function updateArticle(values) {
    var queryText = 'UPDATE articles SET title=$1, article=$2 WHERE ID=$3 RETURNING *';
    var row = query(queryText, values).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  saveArticle: function saveArticle(values) {
    var queryText = "INSERT INTO\n      articles (ID, title, article, createdOn, authorId)\n      VALUES ($1, $2, $3, $4, $5) RETURNING *";
    var row = query(queryText, values).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  deleteArticle: function deleteArticle(value) {
    var queryText = 'DELETE FROM articles WHERE ID=$1 RETURNING *';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  deleteAllArticles: function deleteAllArticles() {
    var queryText = 'DELETE FROM articles RETURNING *';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  }
};
var _default = Article;
exports["default"] = _default;
//# sourceMappingURL=article.js.map