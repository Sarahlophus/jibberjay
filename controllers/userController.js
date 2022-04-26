const { User, Thought } = require("../models");

// Aggregate function to get the number of users overall
const userCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all users + count
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID exists" }) : res.json(user)))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user with this id exists!" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove their Thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID exists!" }) : Thought.deleteMany({ _id: { $in: user.thoughts } })))
      .then(() => res.json({ message: "User and Thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // Add friend to user
  addFriend(req, res) {
    console.log("You are adding a new friend 😄");
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID 🙁" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // remove friend from user
  removeFriend(req, res) {
    console.log("You are removing a friend 👋");
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID was found 🙁" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
};
