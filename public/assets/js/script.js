let theUUID;
let peerConnection;
let localStream;
let otherUser;
let peerID;
// let countryID;
let otherPeerID;
let otherCountryID;

const videoGrid = document.getElementById("video-grid");
let localVideo = document.getElementById("videoLocal");
let remoteVideo = document.getElementById("videoRemote");
const topNav = document.querySelector(".navbar");
const bottomNav = document.querySelector(".e1ppydyg1");

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
var onlineCount = document.getElementById("vid");

let form = document.getElementById("form");
let input = document.getElementById("input");
let theMessages = document.getElementById("messages");
let onlineCounter = document.querySelector("h3");
let starttButton = document.getElementById("start");

let ready = false;
let joined = false;
let waitingOnConnection = false;
let videoOn;
let captureReport;

const socket = io.connect();

const myPeer = new Peer();

socket.on("oc", (oc) => {
  onlineCounter.innerHTML = oc + " Users online!";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value !== "" && joined) {
    //if not blank
    let msg = input.value;
    socket.emit("message", msg);
    let item = document.createElement("li");
    item.innerHTML = "<h4 id='you'>You: </h4>" + msg;
    messages.appendChild(item);
    input.value = ""; //clear
    theMessages.scrollTo(0, theMessages.scrollHeight);
  }
  // else if (waitingOnConnection) {
  //   serverMsg("Waiting for stranger");
  // } else if (!joined) {
  //   serverMsg('You havent joined a Room yet! Please click "Start"');
  // } else {
  //   serverMsg("You cannot send a blank message.");
  // }
});

socket.on("message", function (msg, servermsg) {
  if (servermsg) {
    serverMsg(msg);
  } else {
    strangerMsg(msg);
  }
});

myPeer.on("open", (id) => {
  peerID = id;
  updateUser(peerID);
});

socket.on("connect", () => {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.msGetUserMedia;
  const constraints = {
    video: {
      width: {
        min: 480,
        max: 1280,
      },
      aspectRatio: 1.33333,
    },
    audio: true,
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      localStream = stream;
      document.getElementById("local-video").srcObject = localStream;
      if (!localStream.active) {
        videoOn = false;
        serverMsg(
          "Webcam not detected, please refresh page and make sure your webcam permission are correctly set! (Chrome works best)"
        );
        localStream = {};
      } else {
        videoOn = true;
      }
    })
    .catch((error) => {
      console.error("Error accessing media devices.", error);
      videoOn = false;
      serverMsg(
        "Webcam not detected, please refresh page and make sure your webcam permission are correctly set! (Chrome works best)"
      );
    });
});

function startStream() {
  ready = true;
  starttButton.innerHTML = "Next";
  document.getElementById("standby").style.display = "none";
  document.getElementById("liveStream").style.display = "block";
  // document.getElementById("canvas").style.display = "block";
  document.getElementById("stop").style.backgroundColor =
    "rgba(255, 0, 0, 0.5)";
  cardImages.style.display = "none";
  videoGrid.classList.add("vidStyle");
  document.getElementById("chat-container").style.display = "flex";
  document.querySelector(".e1d9wwe010").style.display = "none";
  topNav.classList.add("navbarHide");
  bottomNav.classList.add("bottomNav");
}

window.stopStream = function () {
  socket.emit("stop", peerID, videoOn);
  ready = false;
  theMessages.innerHTML = "";
  document.getElementById("remote-video").srcObject = undefined;
  joined = false;
  // document.getElementById("vidoff").innerHTML = "";
  starttButton.innerHTML = "Start";
  document.getElementById("standby").style.display = "";
  document.getElementById("liveStream").style.display = "none";
  // document.getElementById("canvas").style.display = "block";
  document.getElementById("stop").style.backgroundColor =
    "rgba(255, 0, 0, 0.2)";
  cardImages.style.display = "block";
  videoGrid.classList.remove("vidStyle");
  document.getElementById("chat-container").style.display = "none";
  document.querySelector(".e1d9wwe010").style.display = "flex";
  topNav.classList.remove("navbarHide");
  bottomNav.classList.remove("bottomNav");
};

window.joinRoom = function () {
  socket.emit("stop", peerID, videoOn);
  document.getElementById("standby").style.display = "none";
  startStream();
  serverMsg("Searching for a stranger...");
  waitingOnConnection = true;
  joined = false;
  socket.emit("join room", peerID, videoOn, countryID);
  document.getElementById("remote-video").srcObject = undefined;
  myPeer.on("call", (call) => {
    call.answer(localStream);

    call.on("stream", (theStream) => {
      document.getElementById("remote-video").srcObject = theStream;
    });
  });
};

socket.on("user joined", (id, pid, vOn, cid) => {
  //host
  otherPeerID = pid;
  otherCountryID = cid;
  socket.emit("send peerid", id, peerID, cid);
  theMessages.innerHTML = "";
  try {
    connectToNewUser(pid, localStream);
  } catch (e) {
    serverMsg(
      "Media connection not established due to your webcam having an issue, Chat only."
    );
    socket.emit(
      "message",
      "Media connection not established due to stranger having a webcam error, He cannot see or hear you, Chat only.",
      true
    );
  }
  serverMsg("Connection estabilished", cid);
  // document.getElementById("canvas").style.display = "none";
  joined = true;
  waitingOnConnection = false;
  if (!vOn) {
    document.getElementById("vidoff").innerHTML = "Stranger has no video";
  }
  otherUser = id; //handshake
});
function connectToNewUser(pid, stream) {
  const call = myPeer.call(pid, stream);
  call.on("stream", (theStream) => {
    document.getElementById("remote-video").srcObject = theStream;
  });
}
socket.on("other user", (ou, vOn) => {
  theMessages.innerHTML = "";
  joined = true;
  waitingOnConnection = false;
  // document.getElementById("canvas").style.display = "none";
  if (!vOn) {
    document.getElementById("vidoff").innerHTML = "Stranger has no video";
  }
  otherUser = ou;
});

socket.on("dc", (msg) => {
  // document.getElementById("canvas").style.display = "block";
  document.getElementById("remote-video").srcObject = undefined;
  joined = false;
  theMessages.innerHTML = "";
  // serverMsg('User has disconnected, click "Next"');
  // document.getElementById("vidoff").innerHTML = "";
  joinRoom();
});

socket.on("other peer", (pid, cid) => {
  //joiner
  otherPeerID = pid;
  otherCountryID = cid;

  serverMsg("Connection estabilished", cid);
});

function serverMsg(msg, cid) {
  let item = document.createElement("li");
  item.innerHTML = `<div id='server'>
    <div>
      <img id='avatar' src='assets/img/icon.png' style="padding-top: 5px;">
    </div>
  <div style="display: inline;justify-items: center;margin-left: 10px;">
    ${msg}${cid ? `<br> <img id='flag-stanger' src=${uriFlag(cid)} style="padding: 5px 5px 0 0;">` + cid + ` <a id='report' onclick="reportAbuse()" href="#">Report abuse.</a>` : ""}
  </div>`;
  messages.appendChild(item);
  theMessages.scrollTo(0, theMessages.scrollHeight);
}

function strangerMsg(msg) {
  let item = document.createElement("li");
  item.innerHTML = "<h4>Stranger: </h4>" + msg;
  messages.appendChild(item);
  theMessages.scrollTo(0, theMessages.scrollHeight);
}

function updateUser(peerID) {
  var token = localStorage.getItem("token");
  var dataUser = {
    token,
    peerID,
  };
  if (token) {
    // Lakukan verifikasi token JWT di sisi client
    fetch("/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataUser }),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Token verification failed");
        }
      })
      .catch(function (error) {
        // Token tidak valid, pengguna belum login
        // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan form login atau redirect ke halaman login
        // localStorage.removeItem("token");
        // window.location.href = "/";
      });
  } else {
    // Token tidak ada, pengguna belum login
    // Lakukan tindakan sesuai kebutuhan, misalnya menampilkan form login atau redirect ke halaman login
  }
}

function reportUser() {
  fetch("/user/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      reportBy: peerID,
      userReport: otherPeerID,
      capture: captureReport,
    }), // Menggunakan bidang email
  });
  closeReport();
}

//emoji handlers
let allEmojis = document.querySelectorAll("span");

function showEmojis() {
  //change class of the span elements to show
  for (let i = 0; i < allEmojis.length; i++) {
    allEmojis[i].className = "show";
  }
  allEmojis[0].className = "hide";
}

function addEmoji(emoji) {
  switch (emoji) {
    case 1:
      input.value += "😃";
      break;
    case 2:
      input.value += "😁";
      break;
    case 3:
      input.value += "😅";
      break;
    case 4:
      input.value += "🤣";
      break;
    case 5:
      input.value += "😉";
      break;
    case 6:
      input.value += "😊";
      break;
    case 7:
      input.value += "😇";
      break;
    case 8:
      input.value += "😲";
      break;
    case 9:
      input.value += "😳";
      break;
    case 10:
      input.value += "😥";
      break;
  }
}

function closeEmojis() {
  for (let i = 0; i < allEmojis.length; i++) {
    allEmojis[i].className = "hide";
  }
  allEmojis[0].className = "show";
}

remoteVideo.addEventListener("swiped-left", function (e) {
  joinRoom();
});

remoteVideo.addEventListener("swiped-right", function (e) {
  stopStream();
});

//

var videoId = "remote-video";
var scaleFactor = 0.25;

function capture(video, scaleFactor) {
  if (scaleFactor == null) {
    scaleFactor = 1;
  }
  var w = video.videoWidth * scaleFactor;
  var h = video.videoHeight * scaleFactor;
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, w, h);
  return canvas;
}

function reportAbuse() {
  var video = document.getElementById(videoId);
  var output = document.getElementById("output");
  var canvas = capture(video, scaleFactor);
  canvas.onclick = function () {
    window.open(this.toDataURL(image / jpg));
  };
  const url = canvas.toDataURL();
  captureReport = url;
  output.innerHTML = "";
  output.appendChild(canvas);

  document.getElementById("popupReport").style.display = "block";
}
