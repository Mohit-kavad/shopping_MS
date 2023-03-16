const ShoppingService = require("../services/shopping-service");
const { PublishMessage, SubscribeMessage } = require("../utils");
const { SHOPPING_BINDING_KEY, CUSTOMER_BINDING_KEY } = require("../config");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new ShoppingService();

  SubscribeMessage(channel, service);

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnId } = req.body;

    const { data } = await service.PlaceOrder({ _id, txnId });

    const payload = await service.GetOrderPayload(_id, data, "CREATE_ORDER");

    // PublishCustomerEvent(payload);
    PublishMessage(channel, CUSTOMER_BINDING_KEY, JSON.stringify(payload));
    return res.status(200).json(data);
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    //   const { data } = await userService.GetShopingDetails(_id);
    const { data } = await service.GetOrders(_id);
    return res.status(200).json(data);
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.GetCart({ _id });
    return res.status(200).json(data);
  });
};
