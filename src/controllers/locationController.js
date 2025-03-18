const locationController = async (request, reply) => {
  try {
    const response = await fetch(`https://freegeoip.app/json/${request.params.ip}`);
    const data = await response.json();
    reply.send(data);
  } catch (err) {
    reply.status(500).send(err);
  }
};

module.exports = locationController;