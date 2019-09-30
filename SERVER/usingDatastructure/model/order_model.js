import moment from 'moment';
import uuid from 'uuid';

class Order {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.orders = [];
  }

  /**
   *
   * @returns {object} car object
   */
  //create order
  create(data) {
    const newOrder = {
        id: uuid.v4(),
        car_id: data.car_id || '',
        status: data.status || '',
        price_offered: data.price_offered,
        price: data.price,
        modifiedDate: moment.now(),
    };

    //push order to orders array
    this.orders.push(newOrder);
    return newOrder;
  }

  /**
  *
  * @param {uuid} id
  * @returns {object} order object
  */
 //find a single order
  findOne(id) {
    try {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === id) {
          return this.orders[i];
        }
      }
    } catch (error) {
      return null;
    }
  }

  /**
   *
   * @param {uuid} id
   * @param {object} data
   */
  //Update price of order still pending
  updateOrderPrice(id, newPriceOffered) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    if (this.orders[index].status === 'pending') {
      this.orders[index].old_price_offered = this.orders[index].price_offered;
      this.orders[index].new_price_offered = newPriceOffered;
      this.orders[index].modifiedDate = moment.now();
      return this.orders[index];
    }


    throw new Error();
  }
}
export default new Order();
