const routes = require("express").Router();

const contactsController = require("../controllers/contacts");

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts from the database
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: A list of all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Could not retrieve contacts
 */
routes.get("/", contactsController.getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a specific contact by its unique identifier
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: A single contact object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid contact ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Could not retrieve the contact
 */
routes.get("/:id", contactsController.getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact with the provided information
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: blue
 *               birthday:
 *                 type: string
 *                 example: 1990-01-15
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Could not create the contact
 */
routes.post("/", contactsController.createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update an existing contact with new information
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - favoriteColor
 *               - birthday
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               favoriteColor:
 *                 type: string
 *                 example: blue
 *               birthday:
 *                 type: string
 *                 example: 1990-01-15
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       400:
 *         description: Invalid ID or missing required fields
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Could not update the contact
 */
routes.put("/:id", contactsController.updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a contact from the database by its ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The contact ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Could not delete the contact
 */
routes.delete("/:id", contactsController.deleteContact);

module.exports = routes;
