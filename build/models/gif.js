"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var query = _index["default"].query;
var Gif = {
  findOneGif: function findOneGif(value) {
    var queryText = 'SELECT * FROM gifs WHERE ID=$1';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  findAllGifs: function findAllGifs() {
    var queryText = 'SELECT * FROM gifs';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  },
  saveGif: function saveGif(values) {
    var queryText = "INSERT INTO\n      gifs (id, title, gifurl, gifpublicid, createdon, authorid)\n      VALUES ($1, $2, $3, $4, $5, $6)";
    return query(queryText, values);
  },
  deleteGif: function deleteGif(value) {
    var queryText = 'DELETE FROM gifs WHERE ID=$1 RETURNING *';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  deleteAllGifs: function deleteAllGifs() {
    var queryText = 'DELETE FROM gifs RETURNING *';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  }
};
var _default = Gif;
exports["default"] = _default;
//# sourceMappingURL=gif.js.map