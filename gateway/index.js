const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use("/customers", proxy("http://localhost:8000/"));
app.use("/shopping", proxy("http://localhost:8003/"));
app.use("/", proxy("http://localhost:8002/")); //products

app.listen(3000, () => {
  console.log("products is listening on port 3000");
});
