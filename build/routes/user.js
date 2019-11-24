"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _rolesConfig = _interopRequireDefault(require("../config/rolesConfig"));

var router = (0, _express.Router)();
router.post('/create-user', (0, _auth["default"])([_rolesConfig["default"].Admin]), _user.signUp);
router.post('/signin', _user.login);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=user.js.map