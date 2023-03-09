const ProductService = require("../services/product-service");

const service = new ProductService();

module.exports = (app) => {
  app.use("/app-events", (req, res, next) => {
    const { payload } = req.body;
    console.log({ payload });

    console.log("========= Product service received event =============== ");
    return res.status(200).json(payload);
  });
};
