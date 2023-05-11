require("dotenv/config");
module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE,
  MONGODB_COLLECTION: process.env.MONGODB_COLLECTION,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  YOUTUBE_API_URL: process.env.YOUTUBE_API_URL,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};
