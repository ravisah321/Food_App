const resturantModel = require("../Models/resturantModel");

// CREATE RESTURANT
const createResturantController = async (req, res) => {

  console.log("req.user", req.user);
  try {

    const {
      title,
      foods,
      opening_time,
      closing_time,
      pickup,
      delivery,
      isOpen,
      rating,
      address,
      
     
    } = req.body;
    
    // validation
    if (!title || !address || !req.user?.id) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address and user must be authenticated",
      });
    }
    // Validate foods array
    if (!Array.isArray(foods) || foods.length === 0 || foods.some(f => !f.name || typeof f.price !== 'number')) {
      return res.status(400).send({
        success: false,
        message: "Foods must be an array of objects with name and price",
      });
    }
    const newResturant = new resturantModel({
      title,
     
      foods,
      opening_time,
      closing_time,
      address,
      pickup,
      delivery,
      isOpen,
      rating,
      owner:req.user.id,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurant Created successfully",
      resturant: newResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
};

// GET ALL RESTURNAT
const getAllResturantController = async (req, res) => {
  try {
    const { searchType, searchTerm } = req.query;
    let query = {};

    // Apply search filters based on search type
    if (searchType && searchTerm) {
      switch (searchType) {
        case 'food':
          // Search for restaurants that have the specified food in their menu
          query.foods = { $regex: searchTerm, $options: 'i' };
          break;
        case 'restaurant':
          // Search by restaurant name
          query.title = { $regex: searchTerm, $options: 'i' };
          break;
        case 'address':
          // Search by address
          query.address = { $regex: searchTerm, $options: 'i' };
          break;
        case 'rating':
          // Search by minimum rating
          const minRating = parseFloat(searchTerm);
          if (!isNaN(minRating) && minRating >= 1 && minRating <= 5) {
            query.rating = { $gte: minRating };
          }
          break;
        case 'timing':
          // Search by timing (opening time, closing time, or "open now")
          if (searchTerm.toLowerCase().includes('open now') || searchTerm.toLowerCase().includes('now')) {
            query.isOpen = true;
          } else {
            // Search in opening or closing times
            query.$or = [
              { opening_time: { $regex: searchTerm, $options: 'i' } },
              { closing_time: { $regex: searchTerm, $options: 'i' } }
            ];
          }
          break;
        default:
          // If no valid search type, return all restaurants
          break;
      }
    }

    const resturants = await resturantModel.find(query);
    
    if (!resturants || resturants.length === 0) {
      return res.status(404).send({
        success: false,
        message: searchType && searchTerm ? "No restaurants found matching your search criteria" : "No Restaurants Available",
      });
    }
    
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get ALL Restaurant API",
      error,
    });
  }
};

// GET RESTURNAT BY ID
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
};

//DELETE RESTRURNAT
const deleteResturantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Restaurant ID is required",
      });
    }
    
    const deleted = await resturantModel.findByIdAndDelete(restaurantId);
    if (!deleted) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete restaurant api",
      error,
    });
  }
};

const updateResturantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Restaurant ID is required",
      });
    }
    
    const updatedResturant = await resturantModel.findByIdAndUpdate(
      restaurantId,
      req.body,
      { new: true }
    );
    
    if (!updatedResturant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    
    res.status(200).send({
      success: true,
      message: "Restaurant Updated Successfully",
      updatedResturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update restaurant api",
      error,
    });
  }
}

// GET MY RESTAURANTS (for admin to see their own restaurants)
const getMyRestaurantsController = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const restaurants = await resturantModel.find({ owner: userId });
    
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      resturants: restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get my restaurants api",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
  updateResturantController,
  getMyRestaurantsController,
};
