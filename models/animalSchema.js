const mongoose = require("./connection.js");

/////////////////////////////////
/////// Animals Model
/////////////////////////////////
const { Schema, model } = mongoose; // destructuring, grabbing model and Schema off mongoose variable

// Make animals Schema
const animalsSchema = new Schema({
  species: String,
  extinct: Boolean,
  location: String,
  lifeExpectancy: Number,
});

// Make Animal model
const Animal = model("Animal", animalsSchema); // ("name of the model we are making", name of Schema created above)

module.exports = Animal;
