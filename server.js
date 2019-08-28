const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoURI = require("./config/keys");

//initialize express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
//connect mongodb using mongoose middleware
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(e => {
    console.log(e);
  });

//import and use routes for emp
const emp = require("./routes/emp");
app.use("/api", emp);

//listening to port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
