const res = require('express/lib/response');
const { Thought, User } = require('../models');

// methods to query the database
const thoughtController = { 
    // Get thoughts
    getThoughts(req, res) {
        Thought.find()
            .select(-__v)
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findById(req.params.thoughtId) //this promise is returned in the .then as "user"
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Post a new thought
    createThought(req, res) {
        Thought.create(req.body) 
        .then((thought) => res.json(thought)) // not sure how to push to the associated user
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // PUT to update a thought by its _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : Student.deleteMany({ _id: { $in: thought.students } })
        )
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // POST to create a reaction stored in a single thought's reactions array field
    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.params.reactionId } },
          { new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      }, 
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: req.params.reactionId } },
          { new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },          
};


module.exports = thoughtController;