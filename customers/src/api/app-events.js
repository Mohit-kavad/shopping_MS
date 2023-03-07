const CustomerService = require("../services/customer-service");

const service = new CustomerService();

module.exports = (app) => {
  app.use("/app-events", (req, res, next) => {
    const { payload } = req.body;
    console.log({ payload });
    service.SubscribeEvents(payload);

    console.log("=========Shopping service received event =============== ");
    return res.status(200).json(payload);
  });
};
