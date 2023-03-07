const express = require("express");

const app = express();

app.use("/", (req, res) => {
  return res.status(200).json({ msg: "Hello form shopping" });
});

app.listen(8003, () => {
  console.log("shopping is listening on port 8003");
});
