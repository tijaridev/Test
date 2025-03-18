const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
const headerDashboard = document.querySelector(".head-title");
const boxInfo = document.querySelector(".box-info");

const usersContainer = document.querySelector(".users-container");
const actions = document.querySelector(".actions");

const reportsContainer = document.querySelector(".reports-container");

let users = [];
let reports = [];

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function (event) {
    const target = event.target;
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
    if (target.closest("li")) {
      target.closest("li").classList.add("active");

      if (target.closest("li").textContent.trim() === "Users") {
        headerDashboard.style.display = "none";
        boxInfo.style.display = "none";
        usersContainer.style.display = "block";
        reportsContainer.style.display = "none";
        actions.style.display = "block";
        const actionOptions = document.querySelectorAll(".action-options");
        actionOptions.forEach((actionOptions, index) => {
          actionOptions.style.display = "block";
        });
        const textElement = document.querySelector(
          ".table-data .users .head h3"
        );
        textElement.textContent = "Users";

        // Ambil semua dropdown pada halaman
        const dropdowns = document.querySelectorAll(".action-options select");

        // Loop melalui setiap dropdown
        dropdowns.forEach((dropdown, index) => {
          dropdown.addEventListener("change", async (event) => {
            const selectedValue = event.target.value;
            const userId = users[index]._id; // Ambil ID pengguna dari data

            // Lakukan fetch berdasarkan opsi yang dipilih
            if (selectedValue === "false") {
              // Lakukan fetch untuk unban (menonaktifkan pemblokiran)
              try {
                const response = await fetch(`/admin/unban/${userId}`, {
                  method: "PUT",
                });
                const data = await response.json();
                location.reload();
              } catch (error) {
                console.error("Error:", error);
              }
            } else if (selectedValue === "true") {
              // Lakukan fetch untuk ban (memblokir)
              try {
                const response = await fetch(`/admin/ban/${userId}`, {
                  method: "PUT",
                });
                const data = await response.json();
                location.reload();
              } catch (error) {
                console.error("Error:", error);
              }
            }
          });
        });
      } else if (target.closest("li").textContent.trim() === "Dashboard") {
        headerDashboard.style.display = "block";
        boxInfo.style.display = "";
        usersContainer.style.display = "block";
        reportsContainer.style.display = "block";
        actions.style.display = "none";
        const actionOptions = document.querySelectorAll(".action-options");
        actionOptions.forEach((actionOptions, index) => {
          actionOptions.style.display = "none";
        });
        const textUserElement = document.querySelector(
          ".table-data .users .head h3"
        );
        textUserElement.textContent = "Recent Users";
        const textReportElement = document.querySelector(
          ".reports-container .table-data .users .head h3"
        );
        textReportElement.textContent = "Recent Reports";
      } else if (target.closest("li").textContent.trim() === "Reports") {
        headerDashboard.style.display = "none";
        boxInfo.style.display = "none";
        usersContainer.style.display = "none";
        reportsContainer.style.display = "block";
        const textElement = document.querySelector(
          ".reports-container .table-data .users .head h3"
        );
        textElement.textContent = "Reports";
      }
    }
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/admin/") {
    window.location.href = "/admin";
  }
  // Cek token JWT saat halaman dimuat
  var token = localStorage.getItem("adminToken");
  if (token) {
    // Lakukan verifikasi token JWT di sisi server
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
          // Token valid, admin sudah login
          // Redirect ke halaman dashboard
          if (window.location.pathname === "/admin/login") {
            window.location.href = "/admin";
          }
        } else {
          // Token tidak valid, admin belum login
          // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan form login atau redirect ke halaman login
          window.location.href = "/admin/login";
        }
      })
      .catch(function (error) {
        console.error("An error occurred during token verification:", error);
        // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan pesan error
      });
  } else {
    // Token tidak ada, admin belum login
    // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan form login atau redirect ke halaman login
    if (window.location.pathname === "/admin") {
      window.location.href = "/admin/login";
    }
  }

  if (token) {
    // Memanggil data pengguna
    function fetchDataUsers() {
      fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch users data");
          }
        })
        .then(function ({ data }) {
          users = data;
          // Menampilkan data users pada table
          displayUsers(data); // Panggil fungsi untuk menampilkan data pengguna di dalam tabel
          // Menghitung jumlah new user
          const newUserCount = countNewUser(data);
          const newUserElement = document.querySelector(
            ".box-info li:nth-child(1) h3"
          );
          newUserElement.textContent = newUserCount;

          // Menghitung jumlah total users
          const totalUserCount = data.length;
          const totalUserElement = document.querySelector(
            ".box-info li:nth-child(3) h3"
          );
          totalUserElement.textContent = totalUserCount;
        })
        .catch(function (error) {
          console.error("An error occurred while fetching users data:", error);
        });
    }

    // Memanggil data report
    function fetchDataReports() {
      fetch("/api/reports", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("adminToken"),
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch users data");
          }
        })
        .then(function ({ data }) {
          reports = data;
          // Menampilkan data users pada table
          displayReports(data); // Panggil fungsi untuk menampilkan data pengguna di dalam tabel

          // Menghitung jumlah total reports
          const totalReportCount = data.length;
          const totalReportElement = document.querySelector(
            ".box-info li:nth-child(4) h3"
          );
          totalReportElement.textContent = totalReportCount;
        })
        .catch(function (error) {
          console.error(
            "An error occurred while fetching reports data:",
            error
          );
        });
    }

    // Fungsi untuk menampilkan data pengguna di dalam tabel
    function displayUsers(users) {
      const tableBody = document.querySelector("#userTableBody");
      tableBody.innerHTML = ""; // Kosongkan isi tabel sebelum menampilkan data baru

      if (Array.isArray(users)) {
        // Periksa apakah users adalah array
        users.forEach(function (user) {
          const row = document.createElement("tr");

          // Array untuk nama bulan dalam bahasa Inggris
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          // Konversi format tanggal dari yyyy-mm-dd ke dd MonthName yyyy
          const createdAtDate = new Date(user.createdAt);
          const day = String(createdAtDate.getDate()).padStart(2, "0");
          const month = monthNames[createdAtDate.getMonth()];
          const year = createdAtDate.getFullYear();

          const formattedDate = `${day} ${month} ${year}`;

          row.innerHTML = `
        <td>
          <p>${user.fullname}</p>
        </td>
        <td>${formattedDate}</td>
        <td>${user.gender}</td>
        <td>${user.isBanned ? "Banned" : "Active"}</td>
        <td class="action-options">
          <select>
            <option value="" selected disabled hidden>Choose</option>
            <option value="false">Active</option>
            <option value="true">Discactive</option>
          </select>
        </td>
      `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Invalid users data:", users);
      }
    }

    // Fungsi untuk menampilkan data report di dalam tabel
    function displayReports(reports) {
      const tableBody = document.querySelector("#reportTableBody");
      tableBody.innerHTML = ""; // Kosongkan isi tabel sebelum menampilkan data baru

      if (Array.isArray(reports)) {
        // Periksa apakah users adalah array
        reports.forEach(function (report) {
          const row = document.createElement("tr");

          // Array untuk nama bulan dalam bahasa Inggris
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          // Konversi format tanggal dari yyyy-mm-dd ke dd MonthName yyyy
          const createdAtDate = new Date(report.createdAt);
          const day = String(createdAtDate.getDate()).padStart(2, "0");
          const month = monthNames[createdAtDate.getMonth()];
          const year = createdAtDate.getFullYear();

          const formattedDate = `${day} ${month} ${year}`;

          row.innerHTML = `
        <td>
          <p>${report.userReport.fullname}</p>
        </td>
        <td>
          <p>${report.reportBy.fullname}</p>
        </td>
        <td>${formattedDate}</td>
        <td><img id='captureImg' src='${report.capture}'></td>
        <td class="report-options">
          <select>
            <option value="" selected disabled hidden>Choose</option>
            <option value="false">Active</option>
            <option value="true">Discactive</option>
          </select>
        </td>
      `;
          tableBody.appendChild(row);
        });

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var img = document.getElementById("captureImg");
        var modalImg = document.getElementById("img01");
        img.onclick = function () {
          modal.style.display = "block";
          modalImg.src = this.src;
          modalImg.alt = this.alt;
        };

        // When the user clicks on <span> (x), close the modal
        modal.onclick = function () {
          img01.className += " out";
          setTimeout(function () {
            modal.style.display = "none";
            img01.className = "modal-content";
          }, 400);
        };

        //
        const reportDropdowns = document.querySelectorAll(
          ".report-options select"
        );

        // Loop melalui setiap dropdown
        reportDropdowns.forEach((reportDropdowns, index) => {
          reportDropdowns.addEventListener("change", async (event) => {
            const selectedValue = event.target.value;
            const user = reports[index].userReport; // Ambil ID pengguna dari data

            // Lakukan fetch berdasarkan opsi yang dipilih
            if (selectedValue === "false") {
              // Lakukan fetch untuk unban (menonaktifkan pemblokiran)
              try {
                const response = await fetch(`/admin/unban/${user._id}`, {
                  method: "PUT",
                });
                const data = await response.json();
                location.reload();
              } catch (error) {
                console.error("Error:", error);
              }
            } else if (selectedValue === "true") {
              // Lakukan fetch untuk ban (memblokir)
              try {
                const response = await fetch(`/admin/ban/${user._id}`, {
                  method: "PUT",
                });
                const data = await response.json();
                location.reload();
              } catch (error) {
                console.error("Error:", error);
              }
            }
          });
        });
      } else {
        console.error("Invalid reports data:", reports);
      }
    }

    // Fungsi untuk menghitung jumlah new user dalam seminggu terakhir
    function countNewUser(users) {
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const newUsers = users.filter(function (user) {
        const joinDate = new Date(user.createdAt);
        return joinDate > oneWeekAgo;
      });
      return newUsers.length;
    }

    // Memanggil data visitor count
    function fetchVisitorCount() {
      fetch("/visitor/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch visitor count");
          }
        })
        .then(function (data) {
          // Mengupdate jumlah visitors
          const visitorCount = data.visitorCount;
          const visitorElement = document.querySelector(
            ".box-info li:nth-child(2) h3"
          );
          visitorElement.textContent = visitorCount;
        })
        .catch(function (error) {
          console.error(
            "An error occurred while fetching visitor count:",
            error
          );
        });
    }

    fetchDataUsers(); // Memanggil fungsi untuk memuat data users saat halaman dimuat
    fetchVisitorCount(); // Memanggil fungsi untuk memuat visitor count saat halaman dimuat
    fetchDataReports();
  }

  // Logout
  const logoutLink = document.querySelector(".logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      // Hapus token dari local storage
      localStorage.removeItem("adminToken");
      // Redirect ke halaman login atau tindakan sesuai kebutuhan
      window.location.href = "/admin/login";
    });
  }
});
