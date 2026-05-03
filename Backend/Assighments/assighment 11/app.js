// Core Module
const path = require('path');

// External Module
const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const DB_PATH = "mongodb://muhammadanuskhan23_db_user:hygKABUkRfnXbsXJ@ac-a5d3ylf-shard-00-00.xfzqsqj.mongodb.net:27017,ac-a5d3ylf-shard-00-01.xfzqsqj.mongodb.net:27017,ac-a5d3ylf-shard-00-02.xfzqsqj.mongodb.net:27017/prashat_sir?tls=true&tlsAllowInvalidCertificates=true&replicaSet=atlas-aqdyqz-shard-0&authSource=admin&appName=Cluster0";

// local Module
const errorsController = require("./controllers/errors");
const todoItemRouter = require('./routes/todoItemRouter')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoItemRouter);
app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
