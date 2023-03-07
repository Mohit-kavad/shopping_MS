const express = require("express");

const app = express();

app.use("/", (req, res) => {
  return res.status(200).json({ msg: "Hello form Products" });
});

app.listen(8002, () => {
  console.log("products is listening on port 8002");
});
