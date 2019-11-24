"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _v = _interopRequireDefault(require("uuid/v1"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _server = _interopRequireDefault(require("../server"));

var _user = _interopRequireDefault(require("../models/user"));

var _helper = _interopRequireDefault(require("../controllers/helper"));

_dotenv["default"].config();

process.env.NODE_ENV = 'test';
var deleteAllUsers = _user["default"].deleteAllUsers,
    save = _user["default"].save;
var hashPassword = _helper["default"].hashPassword,
    generateToken = _helper["default"].generateToken;

_chai["default"].use(_chaiHttp["default"]);

describe('auth', function () {
  describe('POST /api/v1/auth/create-user', function () {
    var id1 = (0, _v["default"])();
    var obj = generateToken({
      sub: id1,
      role: 'ADMIN'
    });
    var token = "Bearer ".concat(obj); // before(async () => {
    // });

    after(function _callee() {
      return _regenerator["default"].async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _regenerator["default"].awrap(deleteAllUsers());

            case 2:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    it('should create a new user', function _callee2() {
      var values, objt, autht, tokent, user1, res;
      return _regenerator["default"].async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              values = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
              _context2.next = 3;
              return _regenerator["default"].awrap(save(values));

            case 3:
              objt = {
                sub: id1,
                role: 'ADMIN'
              };
              autht = generateToken(objt);
              tokent = "Bearer ".concat(autht);
              user1 = {
                firstName: 'Dante',
                lastName: 'kamau',
                email: 'danielmukuna@gmail.com',
                password: "DANIEL12345",
                gender: 'Male',
                jobRole: 'admin',
                department: 'I.T',
                address: 'Thika'
              };
              _context2.next = 9;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').set('Authorization', tokent).set('Content-Type', 'application/json').send(user1));

            case 9:
              res = _context2.sent;
              (0, _chai.expect)(res).to.have.status(201);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    it('should fail if email field is empty', function _callee3() {
      var user2, res;
      return _regenerator["default"].async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              user2 = {
                firstName: "Daniel",
                lastName: "Mukuna",
                email: "",
                password: "DANIEL12345",
                gender: "Male",
                jobRole: "admin",
                department: "I.T",
                address: "Thika"
              };
              _context3.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').set('Authorization', token).set('Content-Type', 'application/json').send(user2));

            case 3:
              res = _context3.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should fail if user supply invalid email', function _callee4() {
      var user3, res;
      return _regenerator["default"].async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              user3 = {
                firstName: "Daniel",
                lastName: "Mukuna",
                email: 'danielmukuna',
                password: "DANIEL12345",
                gender: "Male",
                jobRole: "admin",
                department: "I.T",
                address: "Thika"
              };
              _context4.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').set('Authorization', token).set('Content-Type', 'application/json').send(user3));

            case 3:
              res = _context4.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it('should fail if a duplicate email is found', function _callee5() {
      var user4, res;
      return _regenerator["default"].async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              user4 = {
                firstName: "Grace",
                lastName: "Kamau",
                email: "daniel@mukuna.com",
                password: "DANIEL12345",
                gender: "feMale",
                jobRole: "admin",
                department: "I.T",
                address: "Thika"
              };
              _context5.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/create-user').set('Authorization', token).set('Content-Type', 'application/json').send(user4));

            case 3:
              res = _context5.sent;
              (0, _chai.expect)(res).to.have.status(500);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
  });
  describe('POST /api/v1/auth/signin', function () {
    var id2 = (0, _v["default"])();
    before(function _callee6() {
      var values;
      return _regenerator["default"].async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              values = [id2, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
              _context6.next = 3;
              return _regenerator["default"].awrap(save(values));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    after(function _callee7() {
      return _regenerator["default"].async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _regenerator["default"].awrap(deleteAllUsers());

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it('should login a user into the application', function _callee8() {
      var user6, res;
      return _regenerator["default"].async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              user6 = {
                email: "daniel@mukuna.com",
                password: "DANIEL12345"
              };
              _context8.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Content-Type', 'application/json').send(user6));

            case 3:
              res = _context8.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
    it('should fail if password is incorrect', function _callee9() {
      var user7, res;
      return _regenerator["default"].async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              user7 = {
                email: "daniel@mukuna.com",
                password: "DANIEL12574345"
              };
              _context9.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Content-Type', 'application/json').send(user7));

            case 3:
              res = _context9.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it('should fail if email field is empty', function _callee10() {
      var user8, res;
      return _regenerator["default"].async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              user8 = {
                email: "",
                password: "DANIEL12345"
              };
              _context10.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Content-Type', 'application/json').send(user8));

            case 3:
              res = _context10.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
    it('should fail if user supply invalid email', function _callee11() {
      var user9, res;
      return _regenerator["default"].async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              user9 = {
                email: "daniel.mukunacom",
                password: "DANIEL1254345"
              };
              _context11.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Content-Type', 'application/json').send(user9));

            case 3:
              res = _context11.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
    it('should fail if a password is not supplied', function _callee12() {
      var user10, res;
      return _regenerator["default"].async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              user10 = {
                email: "daniel.mukunacom",
                password: ""
              };
              _context12.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/auth/signin').set('Content-Type', 'application/json').send(user10));

            case 3:
              res = _context12.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=user.spec.js.map