"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = process.env.NODE_ENV === 'development';
var conn;

if (isProduction) {
  conn = process.env.DATABASE_URL;
} else if (isDevelopment) {
  conn = "postgresql://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_DATABASE);
} else {
  conn = "postgresql://".concat(process.env.DB_USER_TEST, ":").concat(process.env.DB_PASSWORD_TEST, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_DATABASE_TEST);
}

var pool = new _pg.Pool({
  connectionString: conn
});
pool.on('error', function (err, client) {
  client.release();
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
var _default = pool;
exports["default"] = _default;
//# sourceMappingURL=dbConfig.js.map