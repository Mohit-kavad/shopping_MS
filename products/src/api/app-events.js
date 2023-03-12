const ProductService = require("../services/product-service");

const service = new ProductService();

module.exports = (app) => {
  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    if (!payload) {
      return res
        .status(400)
        .json({ error: "Payload is missing or empty from customers" });
    }
    console.log("payload from produt", payload);

    console.log("========= Product service received event =============== ");
    return res.status(200).json(payload);
  });
};
