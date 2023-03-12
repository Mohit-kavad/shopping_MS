const ProductService = require("../services/product-service");
const {
  PublishCustomerEvent,
  PublishShoppingEvent,
} = require("../utils/index");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ProductService();

  app.post("/product/create", async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, suplier, banner } =
        req.body;
      // validation
      const { data } = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    const type = req.params.type;

    try {
      const { data } = await service.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  app.put("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    // get payload to send customer service

    const { data } = await service.GetProductPayload(
      _id,
      { productId: req.body._id },
      "ADD_TO_WISHLIST"
    );
    console.log("data from product aip getpropayload", data);
    PublishCustomerEvent(data);
    return res.status(200).json(data.data.product);
  });

  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;

    const { data } = await service.GetProductPayload(
      _id,
      { productId },
      "REMOVE_FROM_WISHLIST"
    );
    PublishCustomerEvent(data);
    return res.status(200).json(data.data.product);
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = service.GetProductPayload(
      _id,
      {
        productId: req.body._id,
        qty: req.body.qty,
      },
      "ADD_TO_CART"
    );

    PublishCustomerEvent(data);
    PublishShoppingEvent(data);

    const response = {
      product: data.data.product,
      qty: data.data.qty,
    };

    return res.status(200).json(response);
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    const { data } = await service.GetProductPayload(
      _id,
      {
        productId: req.body._id,
        qty: req.body.qty,
      },
      "REMOVE_FROM_CART"
    );

    PublishCustomerEvent(data);
    PublishShoppingEvent(data);

    const response = {
      productId: req.body._id,
      qty: req.body.qty,
    };

    return res.status(200).json(response);
  });

  //get Top products and category
  app.get("/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      next(err);
    }
  });
};
