const { ObjectId } = require("mongodb");

const { getContactsCollection } = require("../models/database");

async function getAllContacts(req, res) {
  try {
    const contactsCollection = await getContactsCollection();
    const contacts = await contactsCollection.find({}).toArray();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve contacts.",
    });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "A contact id must be supplied in the URL.",
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "The supplied contact id is not valid.",
      });
    }

    const contactsCollection = await getContactsCollection();
    const contact = await contactsCollection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found.",
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Could not retrieve the contact.",
    });
  }
}

async function createContact(req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        message: "All contact fields are required.",
      });
    }

    const contactsCollection = await getContactsCollection();
    const result = await contactsCollection.insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({
      message: "Could not create the contact.",
    });
  }
}

async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "An id must be supplied in the URL." });
    }

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "The supplied contact id is not valid." });
    }

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res
        .status(400)
        .json({ message: "All contact fields are required for update." });
    }

    const contactsCollection = await getContactsCollection();
    const result = await contactsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName, email, favoriteColor, birthday } },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Could not update the contact." });
  }
}

async function deleteContact(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "An id must be supplied in the URL." });
    }

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "The supplied contact id is not valid." });
    }

    const contactsCollection = await getContactsCollection();
    const result = await contactsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    return res.status(200).json({ message: "Contact deleted." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the contact." });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
