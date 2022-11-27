////////////////////////
// Import Dependencies
////////////////////////
const express = require("express");
const Animal = require("../models/animalSchema");

////////////////////////
// Create router variable to attach routers
////////////////////////
const router = express.Router(); // router will have all routes attached to it

////////////////////////
// Routes
////////////////////////

// seeding
router.get("/seed", (req, res) => {});

// Index Route
router.get("/", (req, res) => {
  // find all animals from mongoDB, then send them back
  Animal.find({})
    .then((animals) => {
      res.render("animals/index.ejs", { animals });
    })
    .catch((error) => console.log(error));
});

// New Route
router.get("/new", (req, res) => {
  res.render("animals/new.ejs");
});

// Create Route
router.post("/", (req, res) => {
  req.body.extinct = req.body.extinct === "on" ? true : false;
  Animal.create(req.body, (error, createdAnimal) => {
    console.log(createdAnimal);
    res.redirect("/animals");
  });
});

// Edit Route
router.get("/:id/edit", (req, res) => {
  Animal.findById(req.params.id).then((animal) => {
    res.render("animals/edit.ejs", { animal });
  });
});

// Update PUT
router.put("/:id", (req, res) => {
  req.body.extinct = req.body.extinct === "on" ? true : false;
  Animal.findByIdAndUpdate(req.params.id, req.body, (error, updatedAnimal) => {
    console.log(updatedAnimal);
    res.redirect("/animals");
  });
});

// Destroy Route - DELETE
router.delete("/:id", (req, res) => {
  Animal.findByIdAndRemove(req.params.id, (error, animal) => {
    res.redirect("/animals");
  });
});

// Show Route
router.get("/:id", (req, res) => {
  // find the specific animal from the database
  Animal.findById(req.params.id).then((animal) => {
    // render the show.ejs
    res.render("animals/show.ejs", { animal });
  });
});

////////////////////////
// export this router to use in other files
////////////////////////
module.exports = router;
