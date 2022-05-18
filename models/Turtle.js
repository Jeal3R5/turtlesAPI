const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const turtleSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const Turtle = model("Turtle", turtleSchema);

module.exports = Turtle;
