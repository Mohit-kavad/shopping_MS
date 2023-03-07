const express = require("express");

const app = express();

app.use("/", (req, res) => {
  return res.status(200).json({ msg: "Hello form customers" });
});

app.listen(8000, () => {
  console.log("Customer is listening on port 8000");
});
