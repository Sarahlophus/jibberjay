const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: [280, "your Thought is too long!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// create virtual property 'reactionCount' that retrieves length of user's friends array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initialize Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
