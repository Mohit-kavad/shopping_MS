const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async GetCart({ _id }) {
    try {
      const cartItems = await this.repository.Cart(_id);
      return FormateData(cartItems);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async PlaceOrder(userInput) {
    // const { _id, txnId } = userInput;

    // Verify the txn number with payment logs

    const orderResult = await this.repository.CreateNewOrder(
      userInput._id,
      userInput.txnId
    );
    console.log(
      "PLACE ORDER FROM SHOPPING SERVICE ++++++++++============================",
      orderResult
    );
    return FormateData(orderResult);
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async ManageCart(customeId, item, qty, isRemove) {
    const cartResult = await this.repository.AddCartItem(
      customeId,
      item,
      qty,
      isRemove
    );

    return FormateData(cartResult);
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    console.log("======FROM shopping service =======", data, event);
    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }

  async GetOrderPayload(userId, orders, event) {
    if (orders) {
      const payload = {
        event: event,
        data: { userId, orders },
      };
      return payload;
    } else {
      return FormateData({ error: "No order is available" });
    }
  }
}

module.exports = ShoppingService;
