const Joi = require("joi");
const {
  youtube_controllers: { searchOnYoutube },
} = require("../controllers");
const tags = ["api", "Youtube Routes"];
const youtube_routes = [
  {
    method: "GET",
    path: "/youtube/search",
    options: {
      tags,
      handler: searchOnYoutube,
      validate: {
        query: Joi.object({
          search_query: Joi.string().required(),
        }),
      },
    },
  },
];
module.exports = youtube_routes;
