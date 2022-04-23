const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/userController");

// route: api/users (create user)
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId (update, delete user)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends (add friend)
// router.route("/:userId/friends").post(addFriend);

// /api/users/:userId/friends/:friendId (delete friend)
// router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
