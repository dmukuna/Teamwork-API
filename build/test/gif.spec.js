"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _server = _interopRequireDefault(require("../server"));

var _gif = _interopRequireDefault(require("../models/gif"));

var _user = _interopRequireDefault(require("../models/user"));

var _helper = _interopRequireDefault(require("../controllers/helper"));

_dotenv["default"].config();

process.env.NODE_ENV = 'test';
var hashPassword = _helper["default"].hashPassword,
    generateToken = _helper["default"].generateToken;
var save = _user["default"].save,
    deleteAllUsers = _user["default"].deleteAllUsers;
var saveGif = _gif["default"].saveGif,
    deleteAllGifs = _gif["default"].deleteAllGifs;

_chai["default"].use(_chaiHttp["default"]);

describe('Gifs', function () {
  var id1 = (0, _v["default"])();
  var obj = generateToken({
    sub: id1,
    role: 'ADMIN'
  });
  var token = "Bearer ".concat(obj);
  before(function _callee() {
    var gifTitle, gUrl, p_id, date, userValues, gifValues;
    return _regenerator["default"].async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gifTitle = 'First gif test value';
            gUrl = 'http://res.cloudinary.com/mukuna/image/upload/v1574479438/teamwork-api-gifs/utvsco0pt6suogvzfbu9.gif';
            p_id = 'teamwork-api-gifs/utvsco0pt6suogvzfbu9';
            date = (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss');
            userValues = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
            gifValues = [1, gifTitle, gUrl, p_id, date, id1];
            _context.next = 8;
            return _regenerator["default"].awrap(save(userValues));

          case 8:
            _context.next = 10;
            return _regenerator["default"].awrap(saveGif(gifValues));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  after(function _callee2() {
    return _regenerator["default"].async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regenerator["default"].awrap(deleteAllGifs());

          case 2:
            _context2.next = 4;
            return _regenerator["default"].awrap(deleteAllUsers());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  describe('POST /api/v1/gifs', function () {
    it('should create a new gifs', function _callee3() {
      var gif1, gifUrl, res;
      return _regenerator["default"].async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              gif1 = {
                title: 'test title'
              };
              gifUrl = './api/v1/test/211552610004202.gif';
              _context3.next = 4;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded').attach('image', gifUrl).field(gif1));

            case 4:
              res = _context3.sent;
              (0, _chai.expect)(res).to.have.status(201);
              (0, _chai.expect)(res.body.data).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should fail if the gifs url is blank', function _callee4() {
      var gif2, gifUrl2, res;
      return _regenerator["default"].async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              gif2 = {
                title: 'test title'
              };
              gifUrl2 = '';
              _context4.next = 4;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded').attach('image', gifUrl2).field(gif2));

            case 4:
              res = _context4.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it('should fail if the gifs title is blank', function _callee5() {
      var gif3, gifUrl3, res;
      return _regenerator["default"].async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              gif3 = {
                title: ''
              };
              gifUrl3 = './api/v1/test/211552610004202.gif';
              _context5.next = 4;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/gifs').set('Authorization', token).set('Content-Type', 'application/x-www-form-urlencoded').attach('image', gifUrl3).field(gif3));

            case 4:
              res = _context5.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
  });
  describe('GET /api/v1/gifs', function () {
    it('should fetch all gifs', function _callee6() {
      var res;
      return _regenerator["default"].async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/gifs').set('Authorization', token));

            case 2:
              res = _context6.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body.data).to.be.an('array');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
  });
  describe('GET /api/v1/gifs/:gifId', function () {
    it('should fetch get one gif', function _callee7() {
      var res;
      return _regenerator["default"].async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/gifs/1').set('Authorization', token));

            case 2:
              res = _context7.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body).to.be.an('object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it('should fail if gif does not exist', function _callee8() {
      var res;
      return _regenerator["default"].async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/gifs/5').set('Authorization', token));

            case 2:
              res = _context8.sent;
              (0, _chai.expect)(res).to.have.status(500);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
  });
  describe('DELETE /api/v1/gifs/:gifId', function () {
    it('should delete one gif', function _callee9() {
      var res;
      return _regenerator["default"].async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"])["delete"]('/api/v1/gifs/1').set('Authorization', token).set('Content-Type', 'application/json'));

            case 2:
              res = _context9.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it('should fail if gif does not exist', function _callee10() {
      var res;
      return _regenerator["default"].async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"])["delete"]('/api/v1/gifs/5').set('Authorization', token));

            case 2:
              res = _context10.sent;
              (0, _chai.expect)(res).to.have.status(500);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=gif.spec.js.map