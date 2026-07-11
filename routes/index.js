const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("CSE 341 Contacts API");
});

router.use("/contacts", require("./contacts"));

module.exports = router;