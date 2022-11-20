require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4001;

const app = express();

/////////////////////////////////
/////// Database Connections
/////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish our connection
mongoose.connect(DATABASE_URL, CONFIG);

// log connection events from mongoose
mongoose.connection
  .on("open", () => console.log("Mongoose Connected"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log("Mongoose Error", error));

/////////////////////////////////
/////// Register Middleware
/////////////////////////////////
app.use(methodOverride("_method")); // used to override PUT and DELETE
app.use(express.urlencoded({ extended: true })); // get the form data off of req.body
app.use(express.static("public")); // serve files from public static folder like (JS and CSS)

/////////////////////////////////
/////// Animals Model
/////////////////////////////////
const { Schema, model } = mongoose; // destructuring, grabbing modeland Schema off mongoose variable

// Make animals Schema
const animalsSchema = new Schema({
  species: String,
  extinct: Boolean,
  location: String,
  lifeExpectancy: Number,
});

// Make Animal model
const Animal = model("Animal", animalsSchema); // ("name of the model we are making", name of Schema created above)

/////////////////////////////////
/////// Routes
/////////////////////////////////
// Landing Page
app.get("/", (req, res) => {
  res.send("the server is running.");
});

// Seeding
app.get("/animals/seed", (req, res) => {
  const startAnimals = [
    {
      species: "Elephant",
      extinct: "false",
      location: "Africa",
      lifeExpectancy: "70",
    },
    {
      species: "Siberian Tiger",
      extinct: "false",
      location: "Asia",
      lifeExpectancy: "25",
    },
    {
      species: "Boxer Dog",
      extinct: "false",
      location: "Germany",
      lifeExpectancy: "12",
    },
    {
      species: "Tyrannosaurus",
      extinct: "true",
      location: "Western North America",
      lifeExpectancy: "30",
    },
    {
      species: "Megalodon",
      extinct: "true",
      location: "Most Oceans",
      lifeExpectancy: "100",
    },
  ];
  // Delete all animals
  Animal.remove({}, (error, data) => {
    // create new animals once old animals are deleted
    Animal.create(startAnimals, (error, createdAnimals) => {
      res.json(createdAnimals);
    });
  });
});

// Index Route
app.get("/animals", (req, res) => {
  // find all animals from mongoDB, then send them back
  Animal.find({})
    .then((animals) => {
      res.render("animals/index.ejs", { animals });
    })
    .catch((error) => console.log(error));
});

// New Route
app.get("/animals/new", (req, res) => {
  res.render("animals/new.ejs");
});

// Create Route
app.post("/animals", (req, res) => {
  req.body.extinct = req.body.extinct === "on" ? true : false;
  Animal.create(req.body, (error, createdAnimal) => {
    console.log(createdAnimal);
    res.redirect("/animals");
  });
});

// Edit Route
app.get("/animals/:id/edit", (req, res) => {
  Animal.findById(req.params.id).then((animal) => {
    res.render("animals/edit.ejs", { animal });
  });
});

// Update PUT
app.put("/animals/:id", (req, res) => {
  req.body.extinct = req.body.extinct === "on" ? true : false;
  Animal.findByIdAndUpdate(req.params.id, req.body, (error, updatedAnimal) => {
    console.log(updatedAnimal);
    res.redirect("/animals");
  });
});

// Destroy Route - DELETE
app.delete("/animals/:id", (req, res) => {
  Animal.findByIdAndRemove(req.params.id, (error, animal) => {
    res.redirect("/animals");
  });
});

// Show Route
app.get("/animals/:id", (req, res) => {
  // find the specific animal from the database
  Animal.findById(req.params.id).then((animal) => {
    // render the show.ejs
    res.render("animals/show.ejs", { animal });
  });
});
/////////////////////////////////
/////// Server Listener
/////////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
