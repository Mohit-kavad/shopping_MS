const CustomerService = require("../services/customer-service");

const service = new CustomerService();

module.exports = (app) => {
  app.use("/app-events", async (req, res) => {
    const { payload } = req.body || {};

    if (!payload) {
      return res
        .status(400)
        .json({ error: "Payload is missing or empty from customers" });
    }
    console.log({ payload });
    service.SubscribeEvents(payload);

    console.log("=========customers service received event =============== ");
    return res.status(200).json(payload);
  });
};
