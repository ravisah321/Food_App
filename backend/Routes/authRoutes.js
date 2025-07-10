const express = require("express");
const {
  registerController,
  loginController,
} = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");
const { updateProfile, deleteProfile } = require("../Controllers/userController");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login",  loginController);

// UPDATE PROFILE || PUT
router.put("/profile", authMiddleware, updateProfile);

// DELETE PROFILE || DELETE
router.delete("/profile", authMiddleware, deleteProfile);

module.exports = router;
