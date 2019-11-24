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

var _article = _interopRequireDefault(require("../models/article"));

var _user = _interopRequireDefault(require("../models/user"));

var _helper = _interopRequireDefault(require("../controllers/helper"));

_dotenv["default"].config();

process.env.NODE_ENV = 'test';
var save = _user["default"].save,
    deleteAllUsers = _user["default"].deleteAllUsers;
var deleteAllArticles = _article["default"].deleteAllArticles,
    saveArticle = _article["default"].saveArticle;
var hashPassword = _helper["default"].hashPassword,
    generateToken = _helper["default"].generateToken;

_chai["default"].use(_chaiHttp["default"]);

describe('Articles', function () {
  var id1 = (0, _v["default"])();
  var obj = generateToken({
    sub: id1,
    role: 'ADMIN'
  });
  var token = "Bearer ".concat(obj);
  before(function _callee() {
    var articleTitle, articleText, date, userValues, articleValues;
    return _regenerator["default"].async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            articleTitle = 'First test title';
            articleText = 'First test article test';
            date = (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss');
            userValues = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
            articleValues = [1, articleTitle, articleText, date, id1];
            _context.next = 7;
            return _regenerator["default"].awrap(save(userValues));

          case 7:
            _context.next = 9;
            return _regenerator["default"].awrap(saveArticle(articleValues));

          case 9:
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
            return _regenerator["default"].awrap(deleteAllArticles());

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
  describe('POST /api/v1/articles', function () {
    it('should create a new article', function _callee3() {
      var article1, res;
      return _regenerator["default"].async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              article1 = {
                title: 'first article',
                article: 'first article text'
              };
              _context3.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', token).set('Content-Type', 'application/json').send(article1));

            case 3:
              res = _context3.sent;
              (0, _chai.expect)(res).to.have.status(201);
              (0, _chai.expect)(res.body.data).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should fail if the article body is blank', function _callee4() {
      var article2, res;
      return _regenerator["default"].async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              article2 = {
                title: 'first article',
                article: ''
              };
              _context4.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', token).set('Content-Type', 'application/json').send(article2));

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
    it('should fail if the article title is blank', function _callee5() {
      var article3, res;
      return _regenerator["default"].async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              article3 = {
                title: '',
                article: 'first article text'
              };
              _context5.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/articles').set('Authorization', token).set('Content-Type', 'application/json').send(article3));

            case 3:
              res = _context5.sent;
              (0, _chai.expect)(res).to.have.status(400);
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
  describe('GET /api/v1/articles', function () {
    it('should fetch all articles', function _callee6() {
      var res;
      return _regenerator["default"].async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/articles').set('Authorization', token));

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
  describe('GET /api/v1/articles/:articleID', function () {
    it('should fetch get one article', function _callee7() {
      var res;
      return _regenerator["default"].async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/articles/1').set('Authorization', token));

            case 2:
              res = _context7.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body.data).to.be.an('Object');
              (0, _chai.expect)(res.body.data.comments).to.be.an('array');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it('should fail if article does not exist', function _callee8() {
      var res;
      return _regenerator["default"].async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/articles/5').set('Authorization', token));

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
  describe('PATCH /api/v1/articles/:articleID', function () {
    it('should update an article', function _callee9() {
      var article4, res;
      return _regenerator["default"].async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              article4 = {
                title: 'updated first article',
                article: 'updated first article text'
              };
              _context9.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).patch('/api/v1/articles/1').set('Authorization', token).set('Content-Type', 'application/json').send(article4));

            case 3:
              res = _context9.sent;
              (0, _chai.expect)(res).to.have.status(201);
              (0, _chai.expect)(res.body.data).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it('should fail if article does not exist', function _callee10() {
      var article5, res;
      return _regenerator["default"].async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              article5 = {
                title: 'updated first article',
                article: 'updated first article text'
              };
              _context10.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).patch('/api/v1/articles/5').set('Authorization', token).set('Content-Type', 'application/json').send(article5));

            case 3:
              res = _context10.sent;
              (0, _chai.expect)(res).to.have.status(500);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
  });
  describe('DELETE /api/v1/articles/:articleId', function () {
    it('should delete one article', function _callee11() {
      var res;
      return _regenerator["default"].async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"])["delete"]('/api/v1/articles/1').set('Authorization', token));

            case 2:
              res = _context11.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body.data).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
    it('should fail if article does not exist', function _callee12() {
      var res;
      return _regenerator["default"].async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"])["delete"]('/api/v1/articles/6').set('Authorization', token));

            case 2:
              res = _context12.sent;
              (0, _chai.expect)(res).to.have.status(500);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=article.spec.js.map