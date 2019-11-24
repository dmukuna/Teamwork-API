"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _gif = require("../controllers/gif");

var _comment = _interopRequireDefault(require("./comment"));

var _multerConfig = _interopRequireDefault(require("../middleware/multerConfig"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _rolesConfig = _interopRequireDefault(require("../config/rolesConfig"));

var router = (0, _express.Router)();
router.post('/', _multerConfig["default"], _gif.createGifController);
router.get('/', _gif.getGifsController);
router.get('/:gifId', _gif.getGifController);
router["delete"]('/:gifId', _gif.deleteGifController);
router.use('/:gifId/comments', (0, _auth["default"])([_rolesConfig["default"].Employee, _rolesConfig["default"].Admin]), _comment["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=gif.js.map