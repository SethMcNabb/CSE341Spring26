const routes = require("express").Router();

const contactsController = require("../controllers/contacts");

routes.get("/", contactsController.getAllContacts);
routes.get("/:id", contactsController.getContactById);

// Create a new contact
routes.post("/", contactsController.createContact);

// Update a contact by id (expects id as URL param)
routes.put("/:id", contactsController.updateContact);

// Delete a contact by id
routes.delete("/:id", contactsController.deleteContact);

module.exports = routes;
