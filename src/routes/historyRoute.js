module.exports = async function (fastify, options) {
  fastify.get("/history*", function (req, reply) {
    return reply.redirect("/");
  });
};
