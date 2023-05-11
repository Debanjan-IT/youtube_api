const api_routes = [
  // ...require('./user_routes'),
  ...require("./youtube_routes"),
];
const routes = {
  name: "Youtube Routes",
  version: "1.0.0",
  register: async (server, option) => {
    await server.route(api_routes);
  },
};
module.exports = routes;
