const liveForm = document.createElement("div");
liveForm.classList.add("e1d2bgi1", "css-1l1ff3v");

const liveFormHeader = document.createElement("header");
liveFormHeader.classList.add("css-oo6h38");

const liveFormHeaderTitle = document.createElement("div");
liveFormHeaderTitle.classList.add("css-sas5x9");

const liveFormHeaderTitleText = document.createElement("div");
liveFormHeaderTitleText.classList.add("css-70qvj9");
liveFormHeaderTitleText.innerHTML =
  '<p class="css-vnt3u5 e1d2bgi3">Edit Live information</p>';
liveFormHeaderTitle.appendChild(liveFormHeaderTitleText);

liveFormHeader.appendChild(liveFormHeaderTitle);
liveFormHeader.appendChild(document.createElement("div")); // Placeholder for the right side
liveForm.appendChild(liveFormHeader);

const liveFormContent = document.createElement("div");
liveFormContent.classList.add("e1d2bgi2", "css-1yc8mzf");
liveFormContent.appendChild(document.createElement("div")); // Placeholder for the top left
liveFormContent.appendChild(document.createElement("div")); // Placeholder for the top right

const liveFormFields = document.createElement("div");
liveFormFields.classList.add("css-1id3s5p", "e1d2bgi0");

// Cover Image and Live Title (Side-by-Side)
const coverImageAndTitleContainer = document.createElement("div");
coverImageAndTitleContainer.classList.add("css-1jv2629", "e1d2bgi6");

const coverImageContainer = document.createElement("div");
coverImageContainer.classList.add("css-tf675", "e1d2bgi7");

const coverImage = document.createElement("img");
coverImage.src = "/assets/images/live/omegly-card-placeholder.png";
coverImage.classList.add("css-6jrdpz", "e1d2bgi8");
coverImageContainer.appendChild(coverImage);

const coverImageText = document.createElement("div");
coverImageText.classList.add("css-1d2mf49", "e1d2bgi9");
coverImageText.textContent = "Cover";
coverImageContainer.appendChild(coverImageText);

const coverImageEditIcon = document.createElement("div");
coverImageEditIcon.classList.add("css-75di0g", "e1d2bgi10");
const coverImageEditIconSvg = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
coverImageEditIconSvg.setAttribute("viewBox", "0 0 24 24");
coverImageEditIconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
coverImageEditIconSvg.setAttribute("width", "16");
coverImageEditIconSvg.setAttribute("height", "16");
const coverImageEditIconUse = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "use"
);
coverImageEditIconUse.setAttribute(
  "href",
  "/assets/svg/icons.1230a5c1.svg#edit_fill"
);
coverImageEditIconSvg.appendChild(coverImageEditIconUse);
coverImageEditIcon.appendChild(coverImageEditIconSvg);
coverImageContainer.appendChild(coverImageEditIcon);

const coverImageInput = document.createElement("input");
coverImageInput.setAttribute("hidden", "");
coverImageInput.type = "file";
coverImageInput.accept = "image/*";
coverImageInput.id = "thumbnailImage";
coverImageInput.name = "thumbnailImage";
coverImageContainer.appendChild(coverImageInput);

coverImageAndTitleContainer.appendChild(coverImageContainer);

const liveTitleContainer = document.createElement("div");
liveTitleContainer.classList.add("css-qde77l", "e1b52mr20");
const liveTitleTextarea = document.createElement("textarea");
liveTitleTextarea.name = "title";
liveTitleTextarea.placeholder = "Enter Live Title";
liveTitleTextarea.maxLength = "70";
liveTitleTextarea.classList.add("css-825xhh", "e1b52mr21");
liveTitleContainer.appendChild(liveTitleTextarea);
const liveTitleCounter = document.createElement("div");
liveTitleCounter.classList.add("css-13ul99x", "e1b52mr22");
liveTitleCounter.textContent = "58";
liveTitleContainer.appendChild(liveTitleCounter);
coverImageAndTitleContainer.appendChild(liveTitleContainer);

liveFormFields.appendChild(coverImageAndTitleContainer);

// Greeting
const greetingContainer = document.createElement("div");
greetingContainer.classList.add("css-19s3t1h", "e1d2bgi5");
const greetingTitle = document.createElement("p");
greetingTitle.classList.add("css-1gr94ik", "e1d2bgi4");
greetingTitle.textContent = "Greeting";
greetingContainer.appendChild(greetingTitle);

const greetingTextareaContainer = document.createElement("div");
greetingTextareaContainer.classList.add("css-qde77l", "e1b52mr20");
const greetingTextarea = document.createElement("textarea");
greetingTextarea.name = "welcomeMessage";
greetingTextarea.placeholder = "Enter a greeting that is visible to the user";
greetingTextarea.maxLength = "100";
greetingTextarea.classList.add("css-825xhh", "e1b52mr21");
greetingTextarea.style.height = "40px";
greetingTextareaContainer.appendChild(greetingTextarea);
const greetingCounter = document.createElement("div");
greetingCounter.classList.add("css-13ul99x", "e1b52mr22");
greetingCounter.textContent = "60";
greetingTextareaContainer.appendChild(greetingCounter);
greetingContainer.appendChild(greetingTextareaContainer);

liveFormFields.appendChild(greetingContainer);

// Announcement
const announcementContainer = document.createElement("div");
announcementContainer.classList.add("css-19s3t1h", "e1d2bgi5");
const announcementTitle = document.createElement("p");
announcementTitle.classList.add("css-1gr94ik", "e1d2bgi4");
announcementTitle.textContent = "Announcement";
announcementContainer.appendChild(announcementTitle);

const announcementTextareaContainer = document.createElement("div");
announcementTextareaContainer.classList.add("css-qde77l", "e1b52mr20");
const announcementTextarea = document.createElement("textarea");
announcementTextarea.name = "notice";
announcementTextarea.placeholder =
  "Enter today’s concept, room rules, and more! (e.g. Please follow the Community Guidelines carefully!)";
announcementTextarea.maxLength = "200";
announcementTextarea.classList.add("css-825xhh", "e1b52mr21");
announcementTextarea.style.height = "80px";
announcementTextareaContainer.appendChild(announcementTextarea);
const announcementCounter = document.createElement("div");
announcementCounter.classList.add("css-13ul99x", "e1b52mr22");
announcementCounter.textContent = "200";
announcementTextareaContainer.appendChild(announcementCounter);
announcementContainer.appendChild(announcementTextareaContainer);

liveFormFields.appendChild(announcementContainer);

// Video
const videoContainer = document.createElement("div");
videoContainer.classList.add("css-19s3t1h", "e1d2bgi5");
const videoTitle = document.createElement("p");
videoTitle.classList.add("css-1gr94ik", "e1d2bgi4");
videoTitle.textContent = "Video";
videoContainer.appendChild(videoTitle);

const videoSelect = document.createElement("select");
videoSelect.classList.add("css-2w3pu9", "e1d2bgi11");

// Get video input devices
navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        const option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label || `Camera ${device.groupId}`;
        videoSelect.appendChild(option);
      }
    });
  })
  .catch((err) => {
    console.error("Error getting video input devices:", err);
  });

videoContainer.appendChild(videoSelect);
liveFormFields.appendChild(videoContainer);

// Audio
const audioContainer = document.createElement("div");
audioContainer.classList.add("css-19s3t1h", "e1d2bgi5");
const audioTitle = document.createElement("p");
audioTitle.classList.add("css-1gr94ik", "e1d2bgi4");
audioTitle.textContent = "Audio";
audioContainer.appendChild(audioTitle);

const audioSelect = document.createElement("select");
audioSelect.classList.add("css-2w3pu9", "e1d2bgi11");

// Get audio input devices
navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    devices.forEach((device) => {
      if (device.kind === "audioinput") {
        const option = document.createElement("option");
        option.value = device.deviceId;
        option.text = device.label || `Microphone ${device.groupId}`;
        audioSelect.appendChild(option);
      }
    });
  })
  .catch((err) => {
    console.error("Error getting audio input devices:", err);
  });

audioContainer.appendChild(audioSelect);
liveFormFields.appendChild(audioContainer);

liveFormContent.appendChild(liveFormFields);
liveFormContent.appendChild(document.createElement("div")); // Placeholder for the bottom left
liveFormContent.appendChild(document.createElement("div")); // Placeholder for the bottom right
liveForm.appendChild(liveFormContent);

const liveFormFooter = document.createElement("footer");
liveFormFooter.classList.add("css-182zzlw");
liveFormFooter.appendChild(document.createElement("div")); // Placeholder for the left side
const liveFormFooterButtonContainer = document.createElement("div");
liveFormFooterButtonContainer.classList.add("css-xzt4jj");
const liveFormFooterButton = document.createElement("button");
liveFormFooterButton.type = "button";
liveFormFooterButton.textContent = "Start Live";
liveFormFooterButton.classList.add("base-Button-root", "css-igfr97");
liveFormFooterButtonContainer.appendChild(liveFormFooterButton);
liveFormFooter.appendChild(liveFormFooterButtonContainer);
liveForm.appendChild(liveFormFooter);

// Handle Cover Image Upload
coverImage.addEventListener("click", () => {
  coverImageInput.click(); // Trigger the file input click
});
coverImageInput.addEventListener("change", (event) => {
  console.log("cover");

  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Handle Start Live Button Click
liveFormFooterButton.addEventListener("click", () => {
  // Get data from form
  const title = liveTitleTextarea.value;
  const welcomeMessage = greetingTextarea.value;
  const notice = announcementTextarea.value;
  const videoDeviceId = videoSelect.value;
  const audioDeviceId = audioSelect.value;
  const cover = coverImage.src; // Assuming coverImage.src contains base64 encoded image
  const country = countryID;
  const token = localStorage.getItem("token");

  // Send data to backend (replace with actual backend request)
  const dataToSend = {
    title,
    welcomeMessage,
    notice,
    videoDeviceId,
    audioDeviceId,
    cover,
    country,
    token,
  };

  fetch("/api/start-live", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      // Handle response from backend
      console.log(response);

      liveStart();
    })
    .catch((error) => {
      console.error(error);
    });
});

// Append live form to the DOM (replace with your actual container)
document.querySelector(".css-185c7zs").appendChild(liveForm);

const socket = io.connect();
const myPeer = new Peer();
const videoLive = document.getElementById("video-live");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
let liveStream;
let liveOn = false;
myVideo.muted = true;
let ROOM_ID = localStorage.getItem("roomId");
// backBtn.addEventListener("click", () => {
//   document.querySelector(".main__left").style.display = "flex";
//   document.querySelector(".main__left").style.flex = "1";
//   document.querySelector(".main__right").style.display = "none";
//   document.querySelector(".header__back").style.display = "none";
// });

const user = localStorage.getItem("name");

function liveStart() {
  liveOn = true;
  document.querySelector(".main__right").style.display = "";
  document.querySelector(".e10uxksy2").style.display = "none";
  document.querySelector(".options__right").style.display = "flex";

  myPeer.on("call", (call) => {
    console.log("someone call me");
    call.answer();
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on("user-connected", (userId) => {
    connectToNewUser(userId, liveStream);
  });
}

function liveStop() {
  liveOn = false;
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".e10uxksy2").style.display = "";
  document.querySelector(".options__right").style.display = "none";

  // Bersihkan stream video
  window.location.href = "/live";
  liveStream.getTracks().forEach((track) => track.stop());
}

// var myPeer = new myPeer({
//   host: "127.0.0.1",
//   port: 3030,
//   path: "/myPeerjs",
//   config: {
//     iceServers: [
//       { url: "stun:stun01.sipphone.com" },
//       { url: "stun:stun.ekiga.net" },
//       { url: "stun:stunserver.org" },
//       { url: "stun:stun.softjoys.com" },
//       { url: "stun:stun.voiparound.com" },
//       { url: "stun:stun.voipbuster.com" },
//       { url: "stun:stun.voipstunt.com" },
//       { url: "stun:stun.voxgratia.org" },
//       { url: "stun:stun.xten.com" },
//       {
//         url: "turn:192.158.29.39:3478?transport=udp",
//         credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
//         username: "28224511:1379330808",
//       },
//       {
//         url: "turn:192.158.29.39:3478?transport=tcp",
//         credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
//         username: "28224511:1379330808",
//       },
//     ],
//   },

//   debug: 3,
// });

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    liveStream = stream;
  });

const connectToNewUser = (userId, stream) => {
  console.log("I call someone" + userId);
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

myPeer.on("open", (id) => {
  console.log("my id is" + id);
  socket.emit("join-live", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoLive.append(video);
    video.style.transform = "scaleX(-1)";
  });
};

let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

send.addEventListener("click", (e) => {
  if (text.value.length !== 0) {
    socket.emit("livechat", text.value);
    text.value = "";
  }
});

text.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && text.value.length !== 0) {
    socket.emit("livechat", text.value);
    text.value = "";
  }
});

const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.toggle("background__red");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

socket.on("createMessage", (message, userName) => {
  console.log(message);
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message">
        <b><i class="far fa-user-circle"></i> <span> ${
          userName === user ? "me" : userName
        }</span> </b>
        <span>${message}</span>
    </div>`;
});
