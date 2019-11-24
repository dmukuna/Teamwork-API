"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _gif = _interopRequireDefault(require("./routes/gif"));

var _article = _interopRequireDefault(require("./routes/article"));

var _user = _interopRequireDefault(require("./routes/user"));

var _feed = _interopRequireDefault(require("./routes/feed"));

var _auth = _interopRequireDefault(require("./middleware/auth"));

var _rolesConfig = _interopRequireDefault(require("./config/rolesConfig"));

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/api/v1/auth', _user["default"]);
app.use('/api/v1/articles', (0, _auth["default"])([_rolesConfig["default"].Employee, _rolesConfig["default"].Admin]), _article["default"]);
app.use('/api/v1/gifs', (0, _auth["default"])([_rolesConfig["default"].Employee, _rolesConfig["default"].Admin]), _gif["default"]);
app.use('/api/v1/feed', (0, _auth["default"])([_rolesConfig["default"].Employee, _rolesConfig["default"].Admin]), _feed["default"]);
module.exports = app;
//# sourceMappingURL=app.js.map