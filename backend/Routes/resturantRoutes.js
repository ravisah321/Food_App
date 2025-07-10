const express = require("express");

const authMiddleware = require("../Middlewares/authMiddleware");

const {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
  updateResturantController,
  getMyRestaurantsController,
} = require("../Controllers/resturantController");

const router = express.Router();

//routes
// CRAETE RESTURANT || POST
router.post("/create",authMiddleware, createResturantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", authMiddleware, getAllResturantController);

// GET MY RESTAURANTS (for admin) || GET
router.get("/getMyRestaurants", authMiddleware, getMyRestaurantsController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", authMiddleware, getResturantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);

// UPDATE RESTURANT || PUT
router.put("/update/:id", authMiddleware, updateResturantController);


module.exports = router;
