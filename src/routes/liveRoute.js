module.exports = async function (fastify, options) {
  fastify.get("/live/", function (req, reply) {
    return reply.redirect("/live");
  });
  fastify.get("/live", function (req, reply) {
    return reply.sendFile("live.html");
  });
  fastify.get("/live/stream", function (req, reply) {
    return reply.sendFile("broadcast.html");
  });
  fastify.get("/live/watch*", function (req, reply) {
    return reply.sendFile("watch.html");
  });
};
