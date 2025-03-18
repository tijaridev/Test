require("dotenv").config();

const fastify = require("fastify")({ logger: false });
const path = require("path");
const io = require("socket.io")(fastify.server, {
  cors: { origin: "*" },
});
require("./utils/mongoose");

const socketController = require("./controllers/socketController");

socketController(io);

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "../public"),
  prefix: "/", // optional: default '/'
});

fastify.register(require("@fastify/autoload"), {
  dir: path.join(__dirname, "routes"),
});

const start = async () => {
  try {
    await fastify.listen({
      port: 5500,
      // Add any other options you need
    });
    console.log(`Server berjalan di ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
