"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

_dotenv["default"].config();

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var _default = _cloudinary["default"];
exports["default"] = _default;
//# sourceMappingURL=cloudinaryConfig.js.map