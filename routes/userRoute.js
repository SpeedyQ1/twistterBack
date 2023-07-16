const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/").post(userController.login);
router.route("/register").post(userController.register);
router.route("/getUser").post(userController.getUserByToken);



module.exports = router;
