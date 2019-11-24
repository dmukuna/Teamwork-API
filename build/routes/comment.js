"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _comment = _interopRequireDefault(require("../controllers/comment"));

var router = (0, _express.Router)({
  mergeParams: true
});
router.post('/', _comment["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=comment.js.map