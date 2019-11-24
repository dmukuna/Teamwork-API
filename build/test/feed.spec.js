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
            return _regenerator["default"].awrap(deleteAllGifs());

          case 2:
            _context2.next = 4;
            return _regenerator["default"].awrap(deleteAllArticles());

          case 4:
            _context2.next = 6;
            return _regenerator["default"].awrap(deleteAllUsers());

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  describe('GET /api/v1/feeds', function () {
    it('should fetch all articles and gifs', function _callee3() {
      var res;
      return _regenerator["default"].async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator["default"].awrap(_chai["default"].request(_server["default"]).get('/api/v1/feed').set('Authorization', token).set('Content-Type', 'application/json'));

            case 2:
              res = _context3.sent;
              (0, _chai.expect)(res).to.have.status(200);
              (0, _chai.expect)(res.body.data).to.be.an('array');
              (0, _chai.expect)(res.body.status).to.be.equals('success');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=feed.spec.js.map