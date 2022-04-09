const router = require("express").Router();
const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const studentRoutes = require("./studentRoutes");

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use("/students", studentRoutes);

module.exports = router;
