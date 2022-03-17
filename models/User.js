// Define Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
  // TODO: Add individual properties and their types
  thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
  ]
});

// Using mongoose.model() to compile a model based on the schema
// 'User' is the name of the model
// userSchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = User;

