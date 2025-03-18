const User = require("../models/userModel");
const Report = require("../models/reportModel");
const Live = require("../models/liveModel");
const jwt = require("jsonwebtoken");

module.exports = async function (fastify, options) {
  // Endpoint untuk mendapatkan semua data live
  fastify.get("/api/lives", async (request, reply) => {
    try {
      const lives = await Live.find().populate("userId");

      const formattedLives = lives.map((live) => ({
        hostId: live.userId.peerId, // Ambil peerId dari userId
        imageUrl: live.cover,
        liveTitle: live.title,
        userName: live.userId.fullname, // Ambil fullname dari userId
        userImageUrl: live.userId.picture, // Ambil picture dari userId
        country: live.country,
        viewers: live.viewers, // Asumsikan Anda memiliki field viewers di data live
      }));

      reply.send(formattedLives);
    } catch (err) {
      console.error("Gagal mendapatkan data lives:", err);
      reply.status(500).send({ message: "Gagal mendapatkan data lives" });
    }
  });
  // Endpoint untuk memulai live (menggunakan PUT)
  fastify.put("/api/start-live", async (request, reply) => {
    try {
      const {
        title,
        welcomeMessage,
        notice,
        videoDeviceId,
        audioDeviceId,
        cover,
        country,
      } = request.body;
      const token = request.body.token; // Ambil token dari header Authorization

      // Verifikasi token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ganti process.env.JWT_SECRET dengan secret JWT Anda

      // Dapatkan informasi pengguna dari token
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return reply.status(401).send({ message: "User tidak ditemukan" });
      }

      // Cari data live yang sudah ada untuk user ini
      const existingLive = await Live.findOne({ userId: user._id });

      if (existingLive) {
        // Update data live yang ada
        existingLive.title = title;
        existingLive.welcomeMessage = welcomeMessage;
        existingLive.notice = notice;
        existingLive.videoDeviceId = videoDeviceId;
        existingLive.audioDeviceId = audioDeviceId;
        existingLive.cover = cover;
        existingLive.country = country; // Tambahkan country ke data live

        const updatedLive = await existingLive.save();
        reply.send({
          message: "Live berhasil diupdate",
          liveId: updatedLive._id,
        });
      } else {
        // Buat data live baru jika tidak ada
        const newLive = new Live({
          title,
          welcomeMessage,
          notice,
          videoDeviceId,
          audioDeviceId,
          cover,
          country, // Tambahkan country ke data live
          userId: user._id,
        });

        const savedLive = await newLive.save();
        reply.send({
          message: "Live berhasil disimpan",
          liveId: savedLive._id,
        });
      }
    } catch (err) {
      console.error("Gagal menyimpan/mengupdate live:", err);
      if (err.name === "JsonWebTokenError") {
        return reply.status(401).send({ message: "Token tidak valid" });
      }
      reply.status(500).send({ message: "Gagal menyimpan/mengupdate live" });
    }
  });
  // Endpoint untuk mendapatkan data pengguna
  fastify.get("/api/users", async (request, reply) => {
    console.log(request.headers.authorization);
    try {
      // Ambil data pengguna dari database dengan urutan berdasarkan createdAt descending
      const users = await User.find({}, { password: 0 }).sort({
        createdAt: -1,
      });

      return {
        status: "success",
        data: users,
      };
    } catch (error) {
      console.error("Error while fetching users:", error);
      return {
        status: "error",
        message: "Failed to fetch users data",
      };
    }
  });

  fastify.get("/api/reports", async (request, reply) => {
    console.log(request.headers.authorization);
    try {
      // Ambil data pengguna dari database dengan urutan berdasarkan createdAt descending
      const reports = await Report.find()
        .sort({ createdAt: -1 })
        .populate("reportBy", "fullname")
        .populate("userReport", "fullname");

      return {
        status: "success",
        data: reports,
      };

      return {
        status: "success",
        data: reports,
      };
    } catch (error) {
      console.error("Error while fetching reports:", error);
      return {
        status: "error",
        message: "Failed to fetch reports data",
      };
    }
  });
};
