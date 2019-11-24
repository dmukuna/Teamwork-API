"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

/* eslint-disable no-console */
_dotenv["default"].config();

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (typeof port !== 'number') {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

var port = normalizePort(process.env.PORT || '3000');
;

_app["default"].set('port', port);

var server = _http["default"].createServer(_app["default"]);

var address = server.address();

var errorHandler = function errorHandler(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof address === 'string' ? "pipe  ".concat(address) : "port: ".concat(port);

  switch (error.code) {
    case 'EACCES':
      console.error("".concat(bind, " requires elevated privileges."));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error("".concat(bind, " is already in use."));
      process.exit(1);
      break;

    default:
      throw error;
  }
};

server.on('error', errorHandler);
server.on('listening', function () {
  var bind = typeof address === 'string' ? "pipe ".concat(address) : "port ".concat(port);
  console.log("Listening on ".concat(bind));
});
server.listen(port);
var _default = server;
exports["default"] = _default;
//# sourceMappingURL=server.js.map