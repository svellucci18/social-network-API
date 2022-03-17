// Define Mongoose
const mongoose = require('mongoose');

// Create a new instance of the Mongoose schema to define shape of each document
const reactionSchema = new mongoose.Schema({
  // TODO: Add individual properties and their types
  
});

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new mongoose.Schema({
    // TODO: Add individual properties and their types
    
    reactions: [ reactionSchema ]

});

// Using mongoose.model() to compile a model based on the schema
// 'Thought' is the name of the model
// thoughtSchema is the name of the schema we are using to create a new instance of the model
const Thought = mongoose.model('Thought', thoughtSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = Thought;
