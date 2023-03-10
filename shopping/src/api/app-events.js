const ShoppingService = require("./../services/shopping-service");

const service = new ShoppingService();

module.exports = (app) => {
  app.use("/app-events", (req, res) => {
    const { payload } = req.body;
    console.log(payload);

    service.SubscribeEvents(payload);

    console.log("=========Shopping service received event =============== ");
    return res.status(200).json(payload);
  });
};
