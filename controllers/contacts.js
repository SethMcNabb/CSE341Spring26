const { ObjectId } = require('mongodb');

const { getContactsCollection } = require('../models/database');

async function getAllContacts(req, res) {
  try {
    const contactsCollection = await getContactsCollection();
    const contacts = await contactsCollection.find({}).toArray();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: 'Could not retrieve contacts.',
    });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: 'A contact id must be supplied in the query string.',
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'The supplied contact id is not valid.',
      });
    }

    const contactsCollection = await getContactsCollection();
    const contact = await contactsCollection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found.',
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({
      message: 'Could not retrieve the contact.',
    });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
};