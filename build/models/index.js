"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConfig = _interopRequireDefault(require("../config/dbConfig"));

_dbConfig["default"].connect();

var _default = {
  /**
   * DB Query
   * @param {string} text
   * @param {object} params
   * @returns {object} object
   */
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      _dbConfig["default"].query(text, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map