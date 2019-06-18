"use strict";

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//password:postgres:password@127.0.0.1:5432/automartdb
var port = process.env.PORT || 8000;

var server = _http["default"].createServer(_app["default"]);

server.listen(port);
//# sourceMappingURL=server.js.map