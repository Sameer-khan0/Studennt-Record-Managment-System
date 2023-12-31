const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/Record-Managment";
// const mongoURI="mongodb+srv://mernchat:e7N5n74q2XN9OGIX@cluster0.ihzwhvu.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () => {
  const db = await mongoose.connect(mongoURI);
  if (db) {console.log("connected to data-base");}
   else {console.log("not connected to data-base");}
};

module.exports = connectToMongo;
