require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const AnimalRouter = require("./controllers/animal");
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
app.use("/animals", AnimalRouter); // this allows me to pair /fruits to my routes. my routes don't need /fruits.

/////////////////////////////////
/////// Routes
/////////////////////////////////
// Landing Page
app.get("/", (req, res) => {
  res.send("the server is running.");
});

/////////////////////////////////
/////// Server Listener
/////////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
