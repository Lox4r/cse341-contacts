const express = require("express");
const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = mongodb.getDb();

    const contacts = await db
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const db = mongodb.getDb();

    const contact = await db
      .collection("contacts")
      .findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;