const {
  YOUTUBE_API_KEY,
  YOUTUBE_API_URL,
  MONGODB_URL,
  MONGODB_DATABASE,
  MONGODB_COLLECTION,
} = require("../config");
const axios = require("axios");
const { MongoClient } = require("mongodb");
const searchOnYoutube = async (request, h) => {
  try {
    const { search_query } = request.query;
    const client = new MongoClient(MONGODB_URL);
    await client.connect();
    const db = client.db(MONGODB_DATABASE);
    const collection = db.collection(MONGODB_COLLECTION);
    const regex = new RegExp(search_query, "i");
    const queryAvailable = await collection
      .find({ search_query: regex })
      .toArray();
    if (queryAvailable.length > 0) {
      const response = [];
      queryAvailable.forEach((e) => {
        response.push(...e.videos);
      });
      return { results: response };
    }
    const url = `${YOUTUBE_API_URL}key=${YOUTUBE_API_KEY}&q=${search_query}&maxResults=50`;
    const response = await axios.get(url);
    const formattedResults = response.data.items.map((e, i) => {
      if (e.id.videoId) {
        return {
          video_id: e.id.videoId,
          title: e.snippet.title,
          thumbnail: e.snippet.thumbnails.high.url,
          channel_title: e.snippet.channelTitle,
        };
      } else {
        return null;
      }
    });
    const result = await Promise.all(
      formattedResults.filter((e) => e !== null)
    );
    await collection.insertOne({
      search_query,
      videos: result,
    });
    return { results: result };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  searchOnYoutube,
};
