const jwt = require("jsonwebtoken");

const authJWT = async (request, reply, role) => {
  const token = request.headers.authorization?.split(" ")[1];
  console.log("TOKEN", request.headers.authorization);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role === "admin" && decoded.role !== "admin") {
        throw new Error("Unauthorized access for admin role");
      }
      request.user = decoded;
    } catch (error) {
      console.error(error);
      reply.code(401).send({ message: "Unauthorized access" });
    }
  } else {
    reply.code(401).send({ message: "Unauthorized access" });
  }
};

module.exports = authJWT;
