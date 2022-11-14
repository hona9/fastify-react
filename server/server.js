const mongoose = require("mongoose");
const fastify = require("fastify")();
const AutoLoad = require("@fastify/autoload");
const routes = require("./routes");
const path = require("path");
const DistPath = path.join(__dirname, "..", "dist");
const { Sequelize } = require("sequelize");

fastify.register(require("fastify-static"), {
  root: DistPath,
});

fastify.get("/", async (request, reply) => {
  try {
    reply.sendFile("index.html");
  } catch (e) {
    console.log(e);
  }
});
routes.forEach((route) => fastify.route(route));

fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server running at ${fastify.server.address().port}`);
});
