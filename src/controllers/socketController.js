const { v4: uuidV4 } = require("uuid");

let rooms = {};
let oc = 0;

const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("+");
    oc++;
    io.emit("oc", oc);
    let roomID = uuidV4();
    let otherUser;

    socket.on("join room", (peerID, videoOn, countryID) => {
      console.log(otherUser);
      console.log(rooms[roomID] && rooms[roomID].includes(socket.id));

      if (rooms[roomID] && rooms[roomID].includes(socket.id)) {
        console.log("hello???");
        socket
          .to(rooms[roomID].find((id) => id !== socket.id))
          .emit("dc", "User has disconnected");
        console.log("DC WORK");
        console.log(otherUser);
        otherUser = "";
        delete rooms[roomID];
        roomID = uuidV4();
      }

      roomID = findEmptyRoom(roomID);

      if (rooms[roomID]) {
        rooms[roomID].push(socket.id);
      } else {
        rooms[roomID] = [socket.id];
      }

      otherUser = rooms[roomID].find((id) => id !== socket.id);
      console.log(otherUser + " SET!!!");

      if (otherUser) {
        console.log("hit");
        console.log(otherUser);
        socket.emit("other user", otherUser, peerID, videoOn, countryID);
        socket
          .to(otherUser)
          .emit("user joined", socket.id, peerID, videoOn, countryID);
      }

      socket.emit("uuid", roomID);
      console.log(rooms);
    });

    socket.on("send peerid", (id, peerID, countryID) => {
      socket.to(id).emit("other peer", peerID, countryID);
    });

    socket.on("message", (msg, servermsg) => {
      socket
        .to(rooms[roomID].find((id) => id !== socket.id))
        .emit("message", msg, servermsg);
    });

    socket.on("stop", (peerID, videoOn) => {
      console.log(otherUser);
      console.log(rooms[roomID] && rooms[roomID].includes(socket.id));

      if (rooms[roomID] && rooms[roomID].includes(socket.id)) {
        console.log("hello???");
        socket
          .to(rooms[roomID].find((id) => id !== socket.id))
          .emit("dc", "User has disconnected");
        console.log("DC WORK");
        console.log(otherUser);
        otherUser = "";
        delete rooms[roomID];
        roomID = uuidV4();
      }
    });

    socket.on("join-live", (roomId, userId, userName) => {
      console.log(roomId, userId, userName);
      socket.join(roomId);
      setTimeout(() => {
        io.to(roomId).emit("user-connected", userId, { except: socket.id });
      }, 1000);
      socket.on("livechat", (message) => {
        io.to(roomId).emit("createMessage", message, userName);
      });
    });

    socket.on("disconnect", () => {
      console.log("-");
      oc--;
      io.emit("oc", oc);
      console.log("OU + " + otherUser);

      try {
        otherUser = rooms[roomID].find((id) => id !== socket.id);
      } catch {
        console.log("riperror");
      }

      console.log("OU " + otherUser);
      socket.to(otherUser).emit("dc", "User has disconnected");
      delete rooms[roomID];
    });
  });

  function findEmptyRoom(room) {
    for (const [key, value] of Object.entries(rooms)) {
      console.log(`${key}: ${value}`);
      if (value.length === 1) {
        return key;
      }
    }
    return room;
  }
};

module.exports = socketController;
