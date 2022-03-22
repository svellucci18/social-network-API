// Define Mongoose
const { Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat')

// Create a new instance of the Mongoose schema to define shape of each document
const reactionSchema = new Schema({
  // Add individual properties and their types
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: { //returns data in the form of JSON
      getters: true
    },
    id: false
});

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new Schema({
    // TODO: Add individual properties and their types
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    }, 
    reactions: [ reactionSchema ]
    },
    {
    toJSON: { //returns data in the form of JSON
        getters: true
      },
      id: false
});

// virtual retrieves the length of the thought's reaction array field on query
thoughtSchema.virtual('reactionsCount').get(function () {
    return this.reactions.length;
});

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// Using model() to compile a model based on the schema
// 'Thought' is the name of the model
// thoughtSchema is the name of the schema we are using to create a new instance of the model
const Thought = model('Thought', thoughtSchema); //if this fails move this after the virtual

module.exports = Thought;
