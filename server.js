//Dependencies
require("dotenv").config();
const express = require("express");
//Create Application Object
const app = express();
const DATABASE_URL = process.env.DATABASE_URL;
const turtleSeed = require("./models/turtlesSeed");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //body parser

//Mongoose Config
//Require Turtle Schema
const Turtle = require("./models/Turtle.js");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//DB Connection
db.on("error", (err) => console.log(err.message));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// //Routes
// app.get("/", (req, res) => {
//   res.json({ response: "Hello World" });
// });

// //INDUCES

app.get("/turtles/seed", (req, res) => {
  Turtle.deleteMany({}, (err, deletedTurtles) => {
    Turtle.create(turtleSeed, (err, data) => {
      res.redirect("/turtles");
    });
  });
});

//Index
app.get("/turtles", (req, res) => {
  Turtle.find({}, (err, allTurtles) => {
    res.json(allTurtles);
  });
});

//Delete -D
app.delete("/turtles/:index", (req, res) => {
  Turtle.findByIdAndDelete(req.params.index, (err, data) => {
    res.json(data);
  });
});

//Update - U;
app.put("/turtles/:index", (req, res) => {
  Turtle.findByIdAndUpdate(
    req.params.index,
    req.body,
    { new: true },
    (err, updatedTurtle) => {
      res.json(updatedTurtle);
    }
  );
});

//Create - C
app.post("/turtles", (req, res) => {
  Turtle.create(req.body).catch((err) => res.send(err));
  res.redirect("/turtles");
});

//Show - R
app.get("/turtles/:index", (req, res) => {
  Turtle.findById(req.params.index, (err, foundTurtle) => {
    res.json(foundTurtle);
  });
});

app.listen(1337, () => {
  console.log(`They are listening on port 1337...`);
});
