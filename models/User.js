// Define Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
  // Add individual properties and their types
  username: { type: String, required: true, unique: true, trimmed: true},
  email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must match an email address!']}, 
  thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// virtual retrieves the olength of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// Using mongoose.model() to compile a model based on the schema
// 'User' is the name of the model
// userSchema is the name of the schema we are using to create a new instance of the model
const User = mongoose.model('User', userSchema);
module.exports = User;

