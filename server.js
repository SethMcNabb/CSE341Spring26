require("dotenv").config();

const express = require("express");

const routes = require("./routes");
const { connectToDatabase } = require("./models/database");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start the server.", error);
    process.exit(1);
  }
}

startServer();
