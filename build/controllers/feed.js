"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _gif = _interopRequireDefault(require("../models/gif"));

var _article = _interopRequireDefault(require("../models/article"));

var _helper = _interopRequireDefault(require("./helper"));

var findAllGifs = _gif["default"].findAllGifs;
var findAllArticles = _article["default"].findAllArticles;
var compareDates = _helper["default"].compareDates;

var getPosts = function getPosts(req, res, next) {
  var gifArr = [];
  var articleArr = [];
  findAllGifs().then(function (gifRows) {
    gifRows.forEach(function (row) {
      var id = row.id,
          title = row.title,
          gifurl = row.gifurl,
          createdon = row.createdon,
          authorid = row.authorid;
      var gifId = id;
      var gifTitle = title;
      var gifCreatedOn = createdon;
      var gifAuthorId = authorid;
      var values = {
        Id: gifId,
        createdon: gifCreatedOn,
        title: gifTitle,
        URL: gifurl,
        authorId: gifAuthorId
      };
      gifArr.push(values);
    });
    findAllArticles().then(function (articleRows) {
      articleRows.forEach(function (row) {
        var id = row.id,
            title = row.title,
            article = row.article,
            createdon = row.createdon,
            authorid = row.authorid;
        var articleId = id;
        var articleTitle = title;
        var articleCreatedOn = createdon;
        var articleAuthorId = authorid;
        var articleText = article;
        var values = {
          id: articleId,
          createdon: articleCreatedOn,
          title: articleTitle,
          article: articleText,
          authorId: articleAuthorId
        };
        articleArr.push(values);
      });

      if (gifArr.length === 0 && articleArr.length === 0) {
        res.status(400).json({
          status: 'error',
          Error: 'There is no post yet'
        });
      } else {
        var feedArr = [].concat(gifArr, articleArr);
        var sortedArr = feedArr.sort(compareDates('createdon', 'desc'));
        var posts = (0, _toConsumableArray2["default"])(sortedArr);
        res.status(200).json({
          status: 'success',
          data: posts
        });
      }
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        Error: 'Failed to get Articles'
      });
    });
  })["catch"](function () {
    res.status(500).json({
      status: 'error',
      Error: 'Failed to get GIF images'
    });
  });
};

var _default = getPosts;
exports["default"] = _default;
//# sourceMappingURL=feed.js.map