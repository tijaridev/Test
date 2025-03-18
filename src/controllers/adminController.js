const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const adminController = {
  login: async (adminData) => {
    try {
      const admin = await Admin.findOne({
        email: adminData.email,
        password: adminData.password,
      });

      if (admin) {
        const token = jwt.sign(
          { email: admin.email, role: admin.role },
          process.env.JWT_SECRET,
          { expiresIn: "8h" }
        );

        return { status: "success", message: "Login successful", token: token };
      } else {
        return { status: "error", message: "Invalid email or password" };
      }
    } catch (error) {
      console.error(error);
      return { status: "error", message: "An error occurred during login" };
    }
  },

  register: async (adminData) => {
    try {
      const newAdmin = new Admin(adminData);
      await newAdmin.save();
      return { status: "success", message: "Admin registered successfully" };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message:
          "An error occurred during admin registration. Please try again.",
      };
    }
  },
};

module.exports = adminController;
