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
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate({ _id: req.body.userID }, { $push: { thoughts: thought._id } }, { new: true });
      })
      .then(
        ((user) => res.json(user)).catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        })
      );
  },

  //   update thought

  // delete thought

  // add reaction that takes in thoughtId and reaction

  // find one and update a thought with that id
};
