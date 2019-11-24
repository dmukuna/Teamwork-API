"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signUp = void 0;

var _v = _interopRequireDefault(require("uuid/v1"));

var _user = _interopRequireDefault(require("../models/user"));

var _helper = _interopRequireDefault(require("./helper"));

var findOne = _user["default"].findOne,
    save = _user["default"].save;
var hashPassword = _helper["default"].hashPassword,
    comparePassword = _helper["default"].comparePassword,
    isValidEmail = _helper["default"].isValidEmail,
    generateToken = _helper["default"].generateToken;

var signUp = function signUp(req, res, next) {
  var _req$body = req.body,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      email = _req$body.email,
      password = _req$body.password,
      gender = _req$body.gender,
      jobRole = _req$body.jobRole,
      department = _req$body.department,
      address = _req$body.address;
  var checkEmail = isValidEmail(email.trim());
  var checkFields = firstName && lastName && email && password && gender && jobRole && department && address;

  if (!checkFields) {
    res.status(400).json({
      status: 'error',
      Error: 'All fields are required'
    });
  } else if (!checkEmail) {
    res.status(400).json({
      status: 'error',
      Error: 'Please provide a valid email'
    });
  } else {
    var ID = (0, _v["default"])();
    var storedEmail = email.trim().toLowerCase();
    var hashedPassword = hashPassword(password.trim());
    var values = [ID, firstName.trim(), lastName.trim(), storedEmail, hashedPassword, gender.trim(), jobRole.trim().toUpperCase(), department.trim(), address.trim()];
    save(values).then(function () {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          UserID: ID
        }
      });
    })["catch"](function (err) {
      res.status(500).json({
        status: 'error',
        error: 'Failed to save user'
      });
    });
  }
};

exports.signUp = signUp;

var login = function login(req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email || !password || email === '' || password === '') {
    res.status(400).json({
      status: 'error',
      error: 'Email and password fields are required'
    });
  } else {
    var cleanedEmail = email.trim();
    findOne([cleanedEmail]).then(function (row) {
      var id = row.id,
          hashedpassword = row.hashedpassword,
          jobrole = row.jobrole;
      var verifyPwd = comparePassword(password.trim(), hashedpassword);

      if (!verifyPwd) {
        res.status(400).json({
          status: 'error',
          error: 'Incorrect password'
        });
      } else {
        var uJobrole = jobrole.toUpperCase();
        var userObj = {
          sub: id,
          role: uJobrole
        };
        var tokenValue = generateToken(userObj);
        res.status(200).json({
          status: 'success',
          data: {
            token: tokenValue,
            UserId: id
          }
        });
      }
    })["catch"](function () {
      res.status(400).json({
        status: 'error',
        error: 'Failed to get user'
      });
    });
  }
};

exports.login = login;
//# sourceMappingURL=user.js.map