const express = require("express");
const { updateProfile, deleteProfile, showProfile, getUserInfo } = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

// SHOW PROFILE || GET
router.get("/profile", authMiddleware, showProfile);

// GET USER INFO (userName, userRole) || GET
router.get("/userinfo", authMiddleware, getUserInfo);

// UPDATE PROFILE || PUT
router.put("/profile", authMiddleware, updateProfile);

// DELETE PROFILE || DELETE
router.delete("/profile", authMiddleware, deleteProfile);

module.exports = router;