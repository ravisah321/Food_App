const User = require("../Models/userModel");
const Resturant = require("../Models/resturantModel");

// Update Profile Controller
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userName, password, address, phone, userRole, answer } = req.body;

    // Find current user to check previous role
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const prevRole = currentUser.userRole;

    // Build update object (do not allow email change)
    const updateFields = {};
    if (userName) updateFields.userName = userName;
    if (password) updateFields.password = password; // Consider hashing if not already
    if (address) updateFields.address = address;
    if (phone) updateFields.phone = phone;
    if (userRole) updateFields.userRole = userRole;
    if (answer) updateFields.answer = answer;

    // If role is being changed from admin to something else, delete all owned restaurants
    if (userRole && prevRole === 'admin' && userRole !== 'admin') {
      await Resturant.deleteMany({ owner: userId });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select("-password"); // Don't return password

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Delete Profile Controller
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // Delete all restaurants owned by this user
    await Resturant.deleteMany({ owner: userId });
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User account and all owned restaurants deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user account",
      error: error.message,
    });
  }
};

// Show Profile Controller
exports.showProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};

// Get Basic User Info Controller
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("userName userRole");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      userId: userId,
      userName: user.userName,
      userRole: user.userRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user info",
      error: error.message,
    });
  }
};

