document.addEventListener("DOMContentLoaded", function () {
  var token = localStorage.getItem("adminToken");

  if (token) {
    fetch("/admin/verify-token", {
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
        if (data.status === "success") {
          if (window.location.pathname === "/admin/login") {
            window.location.href = "/admin"; // Menggunakan window.location.href untuk redirect
          }
        } else {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login"; // Redirect ke halaman login
        }
      })
      .catch(function (error) {
        console.error("An error occurred during token verification:", error);
      });
  }
});

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.status === "success") {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/admin"; // Redirect setelah login berhasil
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred. Please try again.");
    }
  });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullName = document.getElementById("fullName").value;

    try {
      const response = await fetch("/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      const data = await response.json();
      if (data.status === "success") {
        console.log("Registration successful");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      alert("An error occurred. Please try again.");
    }
  });
}
