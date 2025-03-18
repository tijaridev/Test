const User = require("../models/userModel");
const Report = require("../models/reportModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

// Konfigurasi Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Temukan atau buat pengguna berdasarkan email Google
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          // Jika pengguna tidak ada, buat pengguna baru
          user = new User({
            email: profile.emails[0].value,
            fullname: profile.displayName,
            // Tambahkan properti lain yang diperlukan
          });
          await user.save();
        }
        // Kirim informasi pengguna ke callback
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com", // Ganti dengan email Anda
    pass: "your_password", // Ganti dengan password Anda
  },
});

const userController = {
  // Fungsi untuk Google OAuth callback
  googleAuthCallback: async (code) => {
    try {
      // Gunakan passport.authenticate untuk menangani callback Google OAuth
      // Ini akan memvalidasi kode OAuth dan menghasilkan token JWT
      const user = await new Promise((resolve, reject) => {
        passport.authenticate(
          "google",
          { session: false },
          (err, user, info) => {
            if (err) {
              reject(err);
            } else if (!user) {
              reject(new Error("Authentication failed"));
            } else {
              resolve(user);
            }
          }
        )(null, null, code);
      });

      // Generate token JWT
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        status: "success",
        message: "Login successful",
        token: token,
        name: user.fullname,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "An error occurred during Google OAuth callback",
      };
    }
  },

  // Fungsi register
  register: async (userData) => {
    try {
      // Logika untuk register
      // Misalnya, tambahkan user baru ke database
      const newUser = new User(userData);
      await newUser.save();
      return { status: "success", message: "User registered successfully" };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "An error occurred during registration. Please try again.",
      };
    }
  },

  // Fungsi login
  login: async (userData) => {
    try {
      // Logika untuk login
      // Misalnya, periksa kecocokan data login dengan data di database
      const user = await User.findOne({
        email: userData.email,
        password: userData.password,
      });

      if (user) {
        // Periksa apakah pengguna diblokir
        if (user.isBanned) {
          return {
            status: "error",
            message: "Your account is banned. You cannot login.",
          };
        }

        // Generate token JWT dengan kedaluwarsa dalam 1 hari
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1d", // Token kedaluwarsa dalam 1 hari
        });

        return {
          status: "success",
          message: "Login successful",
          token: token,
          userData: {
            name: user.fullname,
            gender: user.gender,
            rid: user.peerId,
          },
        };
      } else {
        return { status: "error", message: "Invalid email or password" };
      }
    } catch (error) {
      console.error(error);
      return { status: "error", message: "An error occurred during login" };
    }
  },

  // Fungsi untuk forgot password
  forgotPassword: async (email) => {
    try {
      // Temukan pengguna berdasarkan email
      const user = await User.findOne({ email: email });
      if (!user) {
        return { status: "error", message: "User not found" };
      }

      // Generate token reset password
      const resetToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Token kedaluwarsa dalam 1 jam
        }
      );

      // Simpan token reset password dalam basis data
      user.resetToken = resetToken;
      await user.save();

      // Kirim email reset password
      const mailOptions = {
        from: "your_email@gmail.com", // Ganti dengan email Anda
        to: email,
        subject: "Reset Password",
        html: `
        <p>Anda menerima email ini karena Anda meminta untuk mereset password akun Anda.</p>
        <p>Klik tautan berikut untuk mereset password Anda:</p>
        <a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>
        <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
      `,
      };
      await transporter.sendMail(mailOptions);

      return { status: "success", message: "Reset password email sent" };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "An error occurred during forgot password",
      };
    }
  },

  // Fungsi untuk reset password
  resetPassword: async (token, newPassword) => {
    try {
      // Verifikasi token reset password
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;

      // Temukan pengguna berdasarkan email
      const user = await User.findOne({ email: email });
      if (!user) {
        return { status: "error", message: "User not found" };
      }

      // Hash password baru
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Perbarui password pengguna
      user.password = hashedPassword;
      user.resetToken = null;
      await user.save();

      return { status: "success", message: "Password reset successfully" };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "An error occurred during reset password",
      };
    }
  },

  // Fungsi untuk verifikasi token JWT
  verifyToken: async (token) => {
    try {
      if (!token) {
        return { status: "error", message: "Token not provided" };
      }

      // Verifikasi token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Dapatkan informasi pengguna dari token
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return { status: "error", message: "User not found" };
      }

      if (user.isBanned) {
        return { status: "error", message: "User is banned. Cannot log in." };
      }

      return { status: "success", message: "Token verified", decoded: decoded };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return {
          status: "error",
          message: "Token expired. Please log in again.",
        };
      } else {
        console.error(error);
        return { status: "error", message: "Token verification failed" };
      }
    }
  },

  // Fungsi untuk update user
  updateUser: async (data) => {
    try {
      if (!data) {
        return { status: "error", message: "Data not provided" };
      }

      // Verifikasi token JWT
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET);

      // Dapatkan informasi pengguna dari token
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return { status: "error", message: "User not found" };
      }

      // Update nilai peerId pengguna jika ditemukan
      if (user) {
        user.peerId = data.peerID; // Update nilai peerId sesuai data.peerId
        await user.save(); // Simpan perubahan ke dalam database
      }

      return { status: "success", message: "Data updated" };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return {
          status: "error",
          message: "Token expired. Please log in again.",
        };
      } else {
        console.error(error);
        return { status: "error", message: "Token verification failed" };
      }
    }
  },

  report: async (reportData) => {
    try {
      // Dapatkan informasi pengguna
      const reportBy = await User.findOne({ peerId: reportData.reportBy });
      const userReport = await User.findOne({ peerId: reportData.userReport });

      if (!reportBy || !userReport) {
        return { status: "error", message: "Data not provided" };
      }
      // Logika untuk report
      // Misalnya, tambahkan user yang baru direport ke database
      const newUser = new Report({
        reportBy,
        userReport,
        capture: reportData.capture,
      });
      await newUser.save();
      return { status: "success", message: "Report successfully" };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "An error occurred during report. Please try again.",
      };
    }
  },
};

module.exports = userController;
