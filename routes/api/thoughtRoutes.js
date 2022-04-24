const router = require("express").Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thoughtController");

// /api/thoughts (get, create)
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId (get, update, delete)
// router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions (create reactio)
// router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId (delete reaction)
// router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
