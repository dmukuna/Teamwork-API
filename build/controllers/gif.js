"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteGifController = exports.getGifController = exports.getGifsController = exports.createGifController = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _moment = _interopRequireDefault(require("moment"));

var _gif = _interopRequireDefault(require("../models/gif"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _cloudinaryConfig = _interopRequireDefault(require("../config/cloudinaryConfig"));

var findOneGif = _gif["default"].findOneGif,
    findAllGifs = _gif["default"].findAllGifs,
    saveGif = _gif["default"].saveGif,
    deleteGif = _gif["default"].deleteGif;
var findGifComments = _comment["default"].findGifComments;

var createGifController = function createGifController(req, res, next) {
  var title = req.body.title;

  if (title === '' || !title) {
    res.status(400).json({
      status: 'error',
      Error: 'The title is required'
    });
  } else if (!req.file || req.file.url === '') {
    res.status(400).json({
      status: 'error',
      Error: 'A GIF image is required'
    });
  } else {
    var URL = req.file.url;
    var gifPublicId = req.file.public_id;
    var createdOn = (0, _moment["default"])().format('YYYY-MM-DD HH:mm:ss');
    var authorId = req.user.sub;
    findAllGifs().then(function (rows) {
      var gifId = Math.max.apply(Math, (0, _toConsumableArray2["default"])(rows.map(function (row) {
        return row.id + 1;
      })).concat([1]));
      var values = [gifId, title, URL, gifPublicId, createdOn, authorId];
      saveGif(values).then(function () {
        var gifCreatedOn = createdOn;
        var gifTitle = title;
        var gifAuthorId = authorId;
        res.status(201).json({
          status: 'success',
          data: {
            message: 'Gif image successfully posted',
            id: gifId,
            createdOn: gifCreatedOn,
            title: gifTitle,
            imageURL: URL,
            PublicId: gifPublicId,
            authorId: gifAuthorId
          }
        });
      })["catch"](function () {
        res.status(500).json({
          status: 'error',
          error: 'Failed to save GIF image'
        });
      });
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        error: 'Failed to get GIF image rows'
      });
    });
  }
};

exports.createGifController = createGifController;

var getGifsController = function getGifsController(req, res, next) {
  findAllGifs().then(function (rows) {
    if (rows.length === 0) {
      res.status(400).json({
        status: 'error',
        Error: 'There is no GIF post yet'
      });
    }

    var gifArr = [];
    rows.forEach(function (g) {
      var id = g.id,
          title = g.title,
          gifurl = g.gifurl,
          gifpublicid = g.gifpublicid,
          createdon = g.createdon,
          authorid = g.authorid;
      var gifCreatedOn = createdon;
      var gifTitle = title;
      var gifAuthorId = authorid;
      var values = {
        gifId: id,
        createdOn: gifCreatedOn,
        title: gifTitle,
        imageURL: gifurl,
        PublicId: gifpublicid,
        authorId: gifAuthorId
      };
      gifArr.push(values);
    });
    res.status(200).json({
      status: 'success',
      data: gifArr
    });
  })["catch"](function () {
    res.status(500).json({
      status: 'error',
      error: 'Failed to get GIF image rows'
    });
  });
};

exports.getGifsController = getGifsController;

var getGifController = function getGifController(req, res, next) {
  if (!req.params.gifId || req.params.gifId === '' || typeof parseInt(req.params.gifId, 10) !== 'number') {
    res.status(400).json({
      status: 'error',
      Error: 'Invalid request'
    });
  } else {
    var paramId = parseInt(req.params.gifId, 10);
    findOneGif([paramId]).then(function (row) {
      var id = row.id,
          title = row.title,
          gifurl = row.gifurl,
          gifpublicid = row.gifpublicid,
          createdon = row.createdon,
          authorid = row.authorid;
      var gifId = id;
      var gifCreatedOn = createdon;
      var gifTitle = title;
      var gifAuthorId = authorid;
      findGifComments([paramId]).then(function (rows) {
        var commentArr = [];
        rows.forEach(function (commentRow) {
          var comment = commentRow.comment;
          var gifComment = comment;
          var gifCommentAuthorId = commentRow.authorid;
          var values = {
            commentId: commentRow.id,
            comment: gifComment,
            CommentAuthorId: gifCommentAuthorId
          };
          commentArr.push(values);
        });
        res.status(200).json({
          status: 'success',
          data: {
            Id: gifId,
            createdOn: gifCreatedOn,
            title: gifTitle,
            imageURL: gifurl,
            PublicId: gifpublicid,
            authorId: gifAuthorId,
            comments: commentArr
          }
        });
      })["catch"](function () {
        res.status(500).json({
          status: 'error',
          error: 'Failed to get GIF comment rows'
        });
      });
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        Error: 'Failed to get gif row'
      });
    });
  }
};

exports.getGifController = getGifController;

var deleteGifController = function deleteGifController(req, res, next) {
  if (!req.params.gifId || req.params.gifId === '' || typeof parseInt(req.params.gifId, 10) !== 'number') {
    res.status(400).json({
      status: 'error',
      Error: 'Invalid request'
    });
  } else {
    var idParam = parseInt(req.params.gifId, 10);
    findOneGif([idParam]).then(function () {
      deleteGif([idParam]).then(function (row) {
        var id = row.id,
            title = row.title,
            gifurl = row.gifurl,
            gifpublicid = row.gifpublicid,
            createdon = row.createdon,
            authorid = row.authorid;
        var gifCreatedOn = createdon;
        var gifTitle = title;
        var gifAuthorId = authorid;

        _cloudinaryConfig["default"].v2.uploader.destroy(gifpublicid).then(function () {
          res.status(200).json({
            status: 'success',
            data: {
              message: 'GIF post successfully deleted',
              gifId: id,
              createdOn: gifCreatedOn,
              title: gifTitle,
              imageURL: gifurl,
              PublicId: gifpublicid,
              authorId: gifAuthorId
            }
          });
        })["catch"](function (err) {
          throw err;
        });
      })["catch"](function () {
        res.status(500).json({
          status: 'error',
          Error: 'Failed to delete GIF image post'
        });
      });
    })["catch"](function () {
      res.status(500).json({
        status: 'error',
        Error: 'Failed to get GIF image post'
      });
    });
  }
};

exports.deleteGifController = deleteGifController;
//# sourceMappingURL=gif.js.map