"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _article = require("../controllers/article");

var _comment = _interopRequireDefault(require("./comment"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _rolesConfig = _interopRequireDefault(require("../config/rolesConfig"));

var router = (0, _express.Router)();
router.post('/', _article.createArticleController);
router.get('/', _article.getArticlesController);
router.get('/:articleId', _article.getArticleController);
router.patch('/:articleId', _article.updateArticleController);
router["delete"]('/:articleId', _article.deleteArticleController);
router.use('/:articleId/comments', (0, _auth["default"])([_rolesConfig["default"].Employee, _rolesConfig["default"].Admin]), _comment["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=article.js.map