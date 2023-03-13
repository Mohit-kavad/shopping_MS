const ShoppingService = require("../services/shopping-service");
const { PublishCustomerEvent } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ShoppingService();

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    const { data } = await service.PlaceOrder({ _id, txnNumber });

    const payload = await service.GetOrderPayload(_id, data, "CREATE_ORDER");
    console.log("**** FROM shopping API *** payload", payload);
    PublishCustomerEvent(payload);
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
