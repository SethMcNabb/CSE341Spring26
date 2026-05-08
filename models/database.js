const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
let contactsCollection;

async function connectToDatabase() {
  if (!contactsCollection) {
    await client.connect();
    const databaseName = process.env.MONGODB_DB_NAME || 'cse341';
    contactsCollection = client.db(databaseName).collection('contacts');
  }     

  return contactsCollection;
}

async function getContactsCollection() {
  if (!contactsCollection) {
    await connectToDatabase();
  }

  return contactsCollection;
}

module.exports = {
  connectToDatabase,
  getContactsCollection,
};