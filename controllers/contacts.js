const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({
      message: "An error occurred while retrieving contacts."
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID."
      });
    }

    const contactId = new ObjectId(req.params.id);

    const contact = await mongodb
      .getDb()
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error getting contact:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the contact."
    });
  }
};

const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, favoriteColor, and birthday are required."
      });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    const result = await mongodb
      .getDb()
      .collection("contacts")
      .insertOne(newContact);

    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      message: "An error occurred while creating the contact."
    });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID."
      });
    }

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, favoriteColor, and birthday are required."
      });
    }

    const contactId = new ObjectId(req.params.id);

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };

    const result = await mongodb
      .getDb()
      .collection("contacts")
      .replaceOne(
        { _id: contactId },
        updatedContact
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({
      message: "An error occurred while updating the contact."
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID."
      });
    }

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      message: "An error occurred while deleting the contact."
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};