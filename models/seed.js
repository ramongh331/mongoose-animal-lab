require("dotenv").config();
const mongoose = require("./connection");
const Animal = require("./animalSchema");

mongoose.connection.on("open", () => {
  // define data we want to put in the database
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
