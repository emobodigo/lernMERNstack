const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const posts = require('./routes/api/post');

//initialize express
const app = express();

//body-parser middleware
app.use(bodyParser.json());

//use routes
app.use('/api/post', posts);

//config DB
const db = require("./config/keys").mongoURI;

//connect ke DB
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => 
    console.log("MongoDB connected")
  )
  .catch((err) => 
    console.log(err)
  );

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server start at port ${port}`));
