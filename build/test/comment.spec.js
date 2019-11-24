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

var _article = _interopRequireDefault(require("../models/article"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _helper = _interopRequireDefault(require("../controllers/helper"));

_dotenv["default"].config();

process.env.NODE_ENV = 'test';
var save = _user["default"].save,
    deleteAllUsers = _user["default"].deleteAllUsers;
var saveArticle = _article["default"].saveArticle,
    deleteAllArticles = _article["default"].deleteAllArticles;
var saveGif = _gif["default"].saveGif,
    deleteAllGifs = _gif["default"].deleteAllGifs;
var deleteAllComments = _comment["default"].deleteAllComments;
var hashPassword = _helper["default"].hashPassword,
    generateToken = _helper["default"].generateToken;

_chai["default"].use(_chaiHttp["default"]);

describe('comments', function () {
  var id1 = (0, _v["default"])();
  var obj = generateToken({
    sub: id1,
    role: 'ADMIN'
  });
  var token = "Bearer ".concat(obj);
  before(function _callee() {
    var articleTitle, articleText, date, userValues, articleValues, gifTitle, gUrl, p_id, gifValues;
    return _regenerator["default"].async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            articleTitle = 'First test title';
            articleText = 'First test article test';
            date = (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss');
            userValues = [id1, 'Daniel', 'Mukuna', 'daniel@mukuna.com', hashPassword('DANIEL12345'), 'male', 'admin', 'I.T', 'thika'];
            articleValues = [1, articleTitle, articleText, date, id1];
            gifTitle = 'First gif test value';
            gUrl = 'http://res.cloudinary.com/mukuna/image/upload/v1574479438/teamwork-api-gifs/utvsco0pt6suogvzfbu9.gif';
            p_id = 'teamwork-api-gifs/utvsco0pt6suogvzfbu9';
            gifValues = [1, gifTitle, gUrl, p_id, date, id1];
            _context.next = 11;
            return _regenerator["default"].awrap(save(userValues));

          case 11:
            _context.next = 13;
            return _regenerator["default"].awrap(saveGif(gifValues));

          case 13:
            _context.next = 15;
            return _regenerator["default"].awrap(saveArticle(articleValues));

          case 15:
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
            return _regenerator["default"].awrap(deleteAllComments());

          case 2:
            _context2.next = 4;
            return _regenerator["default"].awrap(deleteAllGifs());

          case 4:
            _context2.next = 6;
            return _regenerator["default"].awrap(deleteAllArticles());

          case 6:
            _context2.next = 8;
            return _regenerator["default"].awrap(deleteAllUsers());

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  describe('POST /api/v1/articles/:articleID/comments', function () {
    it('should create a new comment on the article', function _callee3() {
      var comment1, res;
      return _regenerator["default"].async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              comment1 = {
                comment: 'first article test comment'
              };
              _context3.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/articles/1/comments').set('Authorization', token).set('Content-Type', 'application/json').send(comment1));

            case 3:
              res = _context3.sent;
              (0, _chai.expect)(res).to.have.status(201);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it('should fail if the comment field is empty', function _callee4() {
      var comment2, res;
      return _regenerator["default"].async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              comment2 = {
                comment: ''
              };
              _context4.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/articles/1/comments').set('Authorization', token).set('Content-Type', 'application/json').send(comment2));

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
  });
  describe('POST /api/v1/gifs/:gifID/comments', function () {
    it('should create a new comment on the gif', function _callee5() {
      var comment3, res;
      return _regenerator["default"].async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              comment3 = {
                comment: 'first gif image test comment'
              };
              _context5.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/gifs/1/comments').set('Authorization', token).set('Content-Type', 'application/json').send(comment3));

            case 3:
              res = _context5.sent;
              (0, _chai.expect)(res).to.have.status(201);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
    it('should fail if the comment field is empty', function _callee6() {
      var comment4, res;
      return _regenerator["default"].async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              comment4 = {
                comment: ''
              };
              _context6.next = 3;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).post('/api/v1/gifs/1/comments').set('Authorization', token).set('Content-Type', 'application/json').send(comment4));

            case 3:
              res = _context6.sent;
              (0, _chai.expect)(res).to.have.status(400);
              (0, _chai.expect)(res.body).to.be.an('Object');
              (0, _chai.expect)(res.body.status).to.be.equals('error');

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=comment.spec.js.map