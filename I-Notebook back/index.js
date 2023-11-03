const connectToMongo = require("./db");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });
// Connecting to Mongo.
connectToMongo();

// Declaration of Variables Required.
const app = express();
const port = 8080;

// Allowing Json Data to be parsed from body.
// Allowing backend to communicate with browser using CORS
app.use(bodyParser.json());
app.use(cors());
// Available Routes.
app.get("/", (req, res) => {
  res.send("I-Notebook");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
