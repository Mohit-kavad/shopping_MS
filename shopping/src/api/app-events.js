const ShoppingService = require("./../services/shopping-service");

const service = new ShoppingService();

module.exports = (app) => {
  app.use("/app-events", async (req, res) => {
    const { payload } = req.body || {};

    if (!payload) {
      return res
        .status(400)
        .json({ error: "Payload is missing or empty from customers" });
    }
    console.log("payload from shopping", payload);
    service.SubscribeEvents(payload);

    console.log("=========Shopping service received event =============== ");
    return res.status(200).json(payload);
  });
};
