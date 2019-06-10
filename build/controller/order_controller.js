"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _order_model = _interopRequireDefault(require("../model/order_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Order = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} order object
   */
  //post order to array (as database)
  create: function create(req, res) {
    if (!req.body.price && !req.body.price_offered && !req.body.status) {
      return res.status(400).send({
        message: 'All fields are required'
      });
    }

    var order = _order_model["default"].create(req.body);

    return res.status(201).send(order);
  },

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} 
   */
  //update price of order already posted
  getUpdateOrderPrice: function getUpdateOrderPrice(req, res) {
    var order = _order_model["default"].findOne(req.params.orderId);

    if (!order) {
      return res.status(404).send({
        message: 'order not found'
      });
    }

    try {
      var updatedPrice = _order_model["default"].updateOrderPrice(req.params.orderId, req.body.new_price_offered);

      return res.status(200).send(updatedPrice);
    } catch (error) {
      return res.status(404).send({
        message: 'cannot update price'
      });
    }
  }
};
var _default = Order;
exports["default"] = _default;
//# sourceMappingURL=order_controller.js.map