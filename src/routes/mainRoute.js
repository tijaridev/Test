// Inisialisasi jumlah visitor
let visitorCount = 0;

const locationController = require("../controllers/locationController");

module.exports = async function (fastify, options) {
  fastify.get("/", function (req, reply) {
    visitorCount++;
    return reply.sendFile("index.html");
  });
  fastify.get("/location/:ip", locationController);

  fastify.setNotFoundHandler((request, reply) => {
    return reply.sendFile("404.html");
  });

  // Endpoint untuk mendapatkan jumlah visitor saat ini
  fastify.get("/visitor/count", async (request, reply) => {
    return { visitorCount };
  });
};
