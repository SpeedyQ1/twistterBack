const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoute");

const cors = require("cors")
app.use(cors())

mongoose
  .connect(
   `mongodb+srv://saharyash:obymW2xYYdt5JFDm@cluster0.wihvsri.mongodb.net/?retryWrites=true&w=majority`,
    {}
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("working");
});

app.use(bodyParser.json());

app.use("/users", userRoutes );


app.listen(3006, () => {
  console.log("Server running on port 3006");
});