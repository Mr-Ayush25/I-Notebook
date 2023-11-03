const mongoose = require("mongoose");
// Connecting to URI
// const URI = "mongodb://localhost:27017/INotebook";
const URI =
  "mongodb+srv://ayush2511:Ayush2511@notebook.vffjlvt.mongodb.net/INotebook?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(URI).then(() => console.log("Connection Successfully."));
};

module.exports = connectToMongo;
