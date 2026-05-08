const routes = require('express').Router();

const baseController = require('../controllers');
const contactsRoutes = require('./contacts');

routes.get('/', baseController.getName);
routes.use('/contacts', contactsRoutes);

module.exports = routes;