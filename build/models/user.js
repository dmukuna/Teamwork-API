"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

var query = _index["default"].query;
var User = {
  findOne: function findOne(value) {
    var queryText = 'SELECT * FROM users WHERE storeduserEmail = $1';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  findAll: function findAll() {
    var queryText = 'SELECT * FROM users';
    var rows = query(queryText, values).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  },
  save: function save(values) {
    var queryText = "INSERT INTO\n      users (id, firstName, lastName, storeduserEmail, hashedPassword, gender, jobRole, department, address)\n      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    var row = query(queryText, values).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  "delete": function _delete(value) {
    var queryText = 'DELETE FROM users WHERE ID=$1 RETURNING *';
    var row = query(queryText, value).then(function (res) {
      return res.rows[0];
    })["catch"](function (err) {
      throw err;
    });
    return row;
  },
  deleteAllUsers: function deleteAllUsers() {
    var queryText = 'DELETE FROM users RETURNING *';
    var rows = query(queryText, []).then(function (res) {
      return res.rows;
    })["catch"](function (err) {
      throw err;
    });
    return rows;
  }
};
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map