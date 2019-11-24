"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var authorize = function authorize(roles) {
  return [(0, _expressJwt["default"])({
    secret: process.env.SECRET
  }), function (req, res, next) {
    var case1 = roles.length && roles.includes(req.user.role);
    var case2 = !roles.length && !roles.includes(req.user.role);

    if (case1 || case2) {
      return next();
    } // user's role is not authorized


    return res.status(401).json({
      status: 'Error',
      message: 'Unauthorized'
    });
  }];
};

var _default = authorize;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map