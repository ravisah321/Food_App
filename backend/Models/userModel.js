const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
      required : true,
    },
    phone: {
      type: String,
      required: [true, "phone number is require"],
    },
    userRole: {
      type: String,
      required: [true, "user type is required"],
     
      
    },
   
    answer: {
      type: String,
      required: [true, "Asnwer is required"],
    },
  },
  { timestamps: true }
);

//export
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
