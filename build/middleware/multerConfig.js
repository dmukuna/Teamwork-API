"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerStorageCloudinary = _interopRequireDefault(require("multer-storage-cloudinary"));

var _cloudinaryConfig = _interopRequireDefault(require("../config/cloudinaryConfig"));

var storage = (0, _multerStorageCloudinary["default"])({
  cloudinary: _cloudinaryConfig["default"],
  folder: 'teamwork-api-gifs',
  allowedFormats: ['gif']
});
var multerUploads = (0, _multer["default"])({
  storage: storage
}).single('image');
var _default = multerUploads;
exports["default"] = _default;
//# sourceMappingURL=multerConfig.js.map