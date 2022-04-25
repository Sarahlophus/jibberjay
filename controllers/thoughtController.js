const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID exists!" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought and push its _id to the user's thoughts array field
  createThought(req, res) {
    console.log("What a great thought! 🤔");
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });
      })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((course) => (!course ? res.status(404).json({ message: "There is no Thought with this ID!" }) : res.json(course)))
      .catch((err) => res.status(500).json(err));
  },

  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => res.json({ message: "Your Thought has been deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // add reaction that takes in thoughtId
  createReaction(req, res) {
    console.log("You tell 'em! 😎");
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
      .then((thought) => (!thought ? res.status(404).json({ message: "You can't react to that Thought because it doesn't exist 🤦" }) : res.json(thought)))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete reaction
};
