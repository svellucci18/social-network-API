const res = require('express/lib/response');
const { Thought, User } = require('../models');

// methods to query the database
const userController = { 
    // Get users
    getUsers(req, res) {
        User.find()
            .select(-__v)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a user
    getSingleUser(req, res) {
        User.findById(req.params.userId) //this promise is returned in the .then as "user"
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Post a new user
    createUser(req, res) {
        User.create(req.body) // in mySQL this would be .post
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : Student.deleteMany({ _id: { $in: user.students } })
        )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // POST to add a friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      }, 
    // DELETE to remove a friend to a user's friend list
    deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },          
};


module.exports = userController;