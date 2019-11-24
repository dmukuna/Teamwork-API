"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _moment = _interopRequireDefault(require("moment"));

_dotenv["default"].config();

var Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(10));
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword: function comparePassword(password, hashedPassword) {
    return _bcrypt["default"].compareSync(password, hashedPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken: function generateToken(userObj) {
    var token = _jsonwebtoken["default"].sign(userObj, process.env.SECRET, {
      expiresIn: '7d'
    });

    return token;
  },
  compareDates: function compareDates(key) {
    var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';
    return function (a, b) {
      var hasKeyProperty = Object.prototype.hasOwnProperty;

      if (!hasKeyProperty.call(a, key) || !hasKeyProperty.call(b, key)) {
        return 0;
      }

      var comparison = 0;
      var varB = (0, _moment["default"])(b[key]).format('YYYY-MM-DD HH:mm:ss');

      if ((0, _moment["default"])(a[key]).isAfter(varB)) {
        comparison = 1;
      } else if ((0, _moment["default"])(a[key]).isBefore(varB)) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  }
};
var _default = Helper;
exports["default"] = _default;
//# sourceMappingURL=helper.js.map