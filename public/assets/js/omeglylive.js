function getURLPaths() {
  const queryString = window.location.pathname; // Ambil bagian query string dari URL
  return queryString;
}

const flag = uriFlag("id");
console.log(flag);
function getLastPathSegment(url) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

const paths = getURLPaths();
const path = getLastPathSegment(paths);

function getURLParams() {
  const queryString = window.location.search; // Ambil bagian query string dari URL
  const urlParams = new URLSearchParams(queryString); // Buat objek URLSearchParams
  return urlParams;
}

const params = getURLParams();

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("glassmorphic");
  } else {
    navbar.classList.remove("glassmorphic");
  }
});

const cardImages = document.querySelector(".e1nlhvk56");

function startVideoChat() {
  var token = localStorage.getItem("token");
  if (token) {
    joinRoom();
  } else {
    document.getElementById("authPopup").style.display = "block";
  }
}

document.getElementById("authPopup").style.display = "none";

function openSignUp() {
  document.getElementById("formContent").style.display = "none";
  document.getElementById("formSignUpContent").style.display = "block";
}

function closeSignUp() {
  document.getElementById("formContent").style.display = "block";
  document.getElementById("formSignUpContent").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const hostId = params.get("hostId");
  // Cek token JWT saat halaman dimuat
  var token = localStorage.getItem("token");
  if (token) {
    // Lakukan verifikasi token JWT di sisi client
    fetch("/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Token verification failed");
        }
      })
      .then(function (data) {
        if (data.decoded) {
          // Token valid, pengguna sudah login
          // Lakukan tindakan setelah login berhasil, misalnya menampilkan konten yang sesuai
          document.getElementById("authPopup").style.display = "none";
          if (path !== "live") {
            // Panggil script.js setelah login berhasil
            const script = document.createElement("script");
            if (hostId) {
              script.src = "http://localhost:5500/assets/js/watchlive.js";
            } else {
              script.src = "http://localhost:5500/assets/js/live.js";
            }
            document.head.appendChild(script);
          }
        } else {
          localStorage.removeItem("token");
          window.location.href = "/live";
        }
      })
      .catch(function (error) {
        // Token tidak valid, pengguna belum login
        // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan form login atau redirect ke halaman login
        localStorage.removeItem("token");
        window.location.href = "/live";
      });
  } else {
    // Token tidak ada, pengguna belum login
    // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan form login atau redirect ke halaman login
  }
});

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    const hostId = params.get("hostId");
    event.preventDefault();

    var email = document.getElementById("loginEmail").value; // Menggunakan bidang email
    var password = document.getElementById("loginPassword").value;

    // Kirim data login ke backend
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }), // Menggunakan bidang email
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then(function (data) {
        if (data.token) {
          // Login berhasil, simpan token JWT ke local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.userData.name);
          localStorage.setItem("gender", data.userData.gender);
          localStorage.setItem("roomId", data.userData.rid);
          // Lakukan tindakan setelah login berhasil, misalnya redirect ke halaman lain
          document.getElementById("authPopup").style.display = "none";
          if (path !== "live") {
            // Panggil script.js setelah login berhasil
            const script = document.createElement("script");
            if (hostId) {
              script.src = "http://localhost:5500/assets/js/watchlive.js";
            } else {
              script.src = "http://localhost:5500/assets/js/live.js";
            }
            document.head.appendChild(script);
          }
          window.location.href = "/live";
        } else {
          // Login gagal
          alert(data.message);
        }
      })
      .catch(function (error) {
        // Login gagal
        alert("Login gagal!");
        console.error(error);
      });
  });

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var registerEmail = document.getElementById("registerEmail").value; // Menggunakan bidang email
    var registerPassword = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var fullname = document.getElementById("fullname").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;

    if (registerPassword !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Kirim data register ke backend
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerEmail, // Menggunakan bidang email
        password: registerPassword,
        fullname: fullname,
        gender: gender,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then(function (data) {
        // Registrasi berhasil
        alert(data.message);
        // Lakukan tindakan setelah registrasi berhasil
        closeSignUp();
      })
      .catch(function (error) {
        // Registrasi gagal
        alert("Registration failed!");
        console.error(error);
      });
  });

const videoLocalContainer = document.getElementById("videoLocal");
const settingsButton = document.querySelector("#settings");
const reportButton = document.querySelector("#report");

function openSettings() {
  document.getElementById("popupSettings").style.display = "block";
}

function closeSettings() {
  document.getElementById("popupSettings").style.display = "none";
}

function closeReport() {
  document.getElementById("popupReport").style.display = "none";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/live";
}
