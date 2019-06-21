"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = {
  /**
   * Create A Order
   * @param {object} req
   * @param {object} res
   * @returns {object} order object
   */
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var text, values, _ref, rows, order;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = "INSERT INTO\n      orders(id, car_id, buyer, price, price_offered, status, created_on, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *";
              values = [(0, _v["default"])(), req.body.car_id, req.body.buyer, req.body.price, req.body.price_offered, req.body.status, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 2;
              _context.next = 5;
              return _db["default"].query(text, values);

            case 5:
              _ref = _context.sent;
              rows = _ref.rows;
              order = rows[0];
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                order: order
              }));

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),

  /**
   * Update an Order
   * @param {object} req
   * @param {object} res
   * @returns {object} updated order
   */
  getUpdateOrderPrice: function () {
    var _getUpdateOrderPrice = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var findOneQuery, updateOneQuery, _ref2, rows, values, response, modifiedOrder;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findOneQuery = 'SELECT * FROM orders WHERE id=$1';
              updateOneQuery = "UPDATE orders\n      SET car_id=$1,price=$2,price_offered=$3, old_price_offered=$4, new_price_offered=$5, modified_date=$6\n      WHERE id=$7 returning *";
              _context2.prev = 2;
              req.params.id = req.params.orderId;
              _context2.next = 6;
              return _db["default"].query(findOneQuery, [req.params.id]);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                error: 'order not found'
              }));

            case 10:
              if (!(rows[0].status === 'pending')) {
                _context2.next = 19;
                break;
              }

              req.body.old_price_offered = rows[0].price_offered;
              req.body.new_price_offered = req.body.price_offered;
              values = [req.body.car_id, req.body.price, req.body.price_offered, req.body.old_price_offered, req.body.new_price_offered, (0, _moment["default"])(new Date()), req.params.id];
              _context2.next = 16;
              return _db["default"].query(updateOneQuery, values);

            case 16:
              response = _context2.sent;
              modifiedOrder = response.rows[0];
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                modifiedOrder: modifiedOrder
              }));

            case 19:
              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                message: "cannot update price, status is ".concat(rows[0].status)
              }));

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](2);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 22]]);
    }));

    function getUpdateOrderPrice(_x3, _x4) {
      return _getUpdateOrderPrice.apply(this, arguments);
    }

    return getUpdateOrderPrice;
  }()
};
var _default = Order;
exports["default"] = _default;
//# sourceMappingURL=orderController.js.map