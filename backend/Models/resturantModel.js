const mongoose = require("mongoose");

// Food subdocument schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

//schema
const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " Resturant title is required"],
    },
   
    foods: { type: [foodSchema], required: [true, "Foods are required"] },
    opening_time: {
      type: String,
      required: [true, "Opening time is required"],
    },
    closing_time: {
      type: String,
      required: [true, "Closing time is required"],
    },
    pickup: {
      type: Boolean,
      default: false,
    },
    delivery: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
   
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
   
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    owner :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true,
      sparse : true,

    }
   
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Resturant", resturantSchema);
