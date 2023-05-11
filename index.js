"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const routes = require("./routes");
const { PORT, HOST } = require("./config");

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });
  const swaggerOptions = {
    info: {
      title: "Youtube API Documentation",
      version: "1.0.0",
    },
    grouping: "tags",
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  await server.register(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
