const userController = require("../controllers/userController");
const passport = require("passport");

module.exports = async function (fastify, options) {
  // Route untuk Google OAuth
  fastify.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // Callback route untuk Google OAuth
  fastify.get("/auth/google/callback", {
    // Perhatikan perubahan di sini: Mengubah fungsi menjadi objek
    handler: async (request, reply) => {
      // Handle Google OAuth callback
      return userController.googleAuthCallback(request.query.code);
    },
  });

  // Route untuk register
  fastify.post("/register", async (request, reply) => {
    const userData = {
      email: request.body.email, // Menggunakan bidang email
      password: request.body.password,
      fullname: request.body.fullname,
      gender: request.body.gender,
    };
    return userController.register(userData);
  });

  // Route untuk login
  fastify.post("/login", async (request, reply) => {
    const userData = {
      email: request.body.email, // Menggunakan bidang email
      password: request.body.password,
    };
    return userController.login(userData);
  });

  // Route untuk forgot password
  fastify.post("/forgot-password", async (request, reply) => {
    const email = request.body.email;
    return userController.forgotPassword(email);
  });

  // Route untuk reset password
  fastify.post("/reset-password", async (request, reply) => {
    const token = request.body.token;
    const newPassword = request.body.newPassword;
    return userController.resetPassword(token, newPassword);
  });

  // Route untuk verifikasi token JWT
  fastify.post("/verify-token", async (request, reply) => {
    const token = request.body.token;
    return userController.verifyToken(token);
  });

  // Route untuk update user
  fastify.put("/user/update", async (request, reply) => {
    const data = request.body.data;
    return userController.updateUser(data);
  });

  // Route untuk report
  fastify.post("/user/report", async (request, reply) => {
    const reportData = {
      reportBy: request.body.reportBy,
      userReport: request.body.userReport,
      capture: request.body.capture,
    };
    return userController.report(reportData);
  });
};
