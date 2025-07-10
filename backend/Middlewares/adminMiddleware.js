const userModel = require("../Models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }


    
   else if (user.userRole !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin ACess ",
      });
    } else {
      console.log("Admin Access");
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-AUthorized ACCESS",
      error,
    });
  }
};
