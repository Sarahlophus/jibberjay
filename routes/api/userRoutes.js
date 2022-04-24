const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/userController");

// route: api/users (get, create user)
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId (get, update, delete user)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends (add, remove friend)
router.route("/:userId/friends/:friendId").put(addFriend).delete(removeFriend);

module.exports = router;
