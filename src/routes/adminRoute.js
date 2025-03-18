const adminController = require("../controllers/adminController");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async function (fastify, options) {
  // Route untuk login Admin
  fastify.post("/admin/login", async (request, reply) => {
    const adminData = {
      email: request.body.email,
      password: request.body.password,
    };
    const result = await adminController.login(adminData);
    return result;
  });

  // Route untuk register Admin
  fastify.post("/admin/register", async (request, reply) => {
    const adminData = {
      email: request.body.email,
      password: request.body.password,
      fullName: request.body.fullName,
      role: request.body.role || "admin",
    };
    const result = await adminController.register(adminData);
    return result;
  });

  // Route untuk verifikasi token JWT admin
  fastify.post("/admin/verify-token", async (request, reply) => {
    const token = request.body.token;
    console.log("TOKEN", token);
    try {
      if (!token) {
        // Jika token tidak tersedia, kembalikan respons error
        return { status: "error", message: "Token not provided" };
      }

      // Verifikasi token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("adminRoute", decoded);

      // Jika verifikasi berhasil, kembalikan respons sukses
      return { status: "success", message: "Token verified", decoded: decoded };
    } catch (error) {
      console.error(error);
      // Jika verifikasi gagal, kembalikan respons error
      return { status: "error", message: "Token verification failed" };
    }
  });

  // Route untuk halaman dashboard Admin
  fastify.get("/admin/login", async (req, reply) => {
    return reply.sendFile("admin/adminLogin.html");
  });

  // Route untuk halaman login Admin
  fastify.get("/admin", async (req, reply) => {
    return reply.sendFile("admin/index.html");
  });

  // Rute untuk memblokir pengguna
  fastify.put("/admin/ban/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      console.log("ban user", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.isBanned = true;
      await user.save();
      return res.json({ message: "User banned successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Rute untuk membuka blokir pengguna
  fastify.put("/admin/unban/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      console.log("unban user", user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.isBanned = false;
      await user.save();
      return res.json({ message: "User unbanned successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // Route untuk halaman register Admin
  fastify.get("/install", async (req, reply) => {
    return reply.sendFile("admin/adminRegister.html");
  });
};
