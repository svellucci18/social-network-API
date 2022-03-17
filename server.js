const express = require('express');
const db = require('./config/connection');
// Require model
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// TODO: link to api folder?