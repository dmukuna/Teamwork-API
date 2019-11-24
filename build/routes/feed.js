"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _feed = _interopRequireDefault(require("../controllers/feed"));

var router = (0, _express.Router)();
router.get('/', _feed["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=feed.js.map