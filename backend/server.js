//killall -9 node
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
).catch(err => console.log(err));

const connection = mongoose.connection;
//when the connection is opened, console will output string
connection.once("open" , () => {
  console.log("MongoDB database connection established successfully");
});

//require the files from route folder, importing the files
const exercisesRouter = require('./routes/exercises.js');
const usersRouter = require('./routes/users.js');
//tells app to use the files we required
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
