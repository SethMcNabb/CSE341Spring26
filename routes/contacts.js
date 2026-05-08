const routes = require('express').Router();

const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.getAllContacts);
routes.get('/detail', contactsController.getContactById);

module.exports = routes;