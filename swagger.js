const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "A simple RESTful API for managing contacts",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.BASE_URL || "https://cse341spring26.onrender.com"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      schemas: {
        Contact: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "email",
            "favoriteColor",
            "birthday",
          ],
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the contact",
              example: "507f1f77bcf86cd799439011",
            },
            firstName: {
              type: "string",
              description: "First name of the contact",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "Last name of the contact",
              example: "Doe",
            },
            email: {
              type: "string",
              description: "Email address of the contact",
              example: "john.doe@example.com",
            },
            favoriteColor: {
              type: "string",
              description: "Favorite color of the contact",
              example: "blue",
            },
            birthday: {
              type: "string",
              description: "Birthday of the contact",
              example: "1990-01-15",
            },
          },
        },
      },
    },
  },
  apis: [require("path").join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
