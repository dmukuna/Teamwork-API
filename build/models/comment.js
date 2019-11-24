"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var query = _index["default"].query;
var Comment = {
  findOneComment: function findOneComment(value) {
    var queryText = 'SELECT * FROM comments WHERE ID=$1';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  findAllComments: function findAllComments() {
    var queryText = 'SELECT * FROM comments';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  },
  findArticleComments: function findArticleComments(value) {
    var queryText = 'SELECT * FROM comments WHERE articleId=$1';
    var rows = query(queryText, value).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  },
  findGifComments: function findGifComments(value) {
    var queryText = 'SELECT * FROM comments WHERE gifid=$1';
    var rows = query(queryText, value).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  },
  saveGifComment: function saveGifComment(values) {
    var queryText = "INSERT INTO\n      comments (id, comment, createdon, authorid, gifid)\n      VALUES ($1, $2, $3, $4, $5)";
    var row = query(queryText, values).then(function (res) {
      return res;
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  saveArticleComment: function saveArticleComment(values) {
    var queryText = "INSERT INTO\n      comments (id, comment, createdon, authorid, articleid)\n      VALUES ($1, $2, $3, $4, $5)";
    var row = query(queryText, values).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  deleteComment: function deleteComment(value) {
    var queryText = 'DELETE FROM comments WHERE ID=$1 RETURNING *';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  deleteAllComments: function deleteAllComments() {
    var queryText = 'DELETE FROM comments RETURNING *';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  }
};
var _default = Comment;
exports["default"] = _default;
//# sourceMappingURL=comment.js.map