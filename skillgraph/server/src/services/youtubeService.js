const axios = require("axios");

const YOUTUBE_API_URL =
  "https://www.googleapis.com/youtube/v3/search";

async function searchYouTubePlaylists(skill) {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error(
      "YOUTUBE_API_KEY is missing"
    );
  }

  const response = await axios.get(
    YOUTUBE_API_URL,
    {
      params: {
        part: "snippet",
        q: `${skill} complete course tutorial`,
        type: "playlist",
        maxResults: 10,
        order: "relevance",
        relevanceLanguage: "en",
        regionCode: "IN",
        key: process.env.YOUTUBE_API_KEY,
      },
    }
  );

  return response.data.items.map(
    (item) => ({
      youtubeId:
        item.id.playlistId,

      title:
        item.snippet.title,

      description:
        item.snippet.description,

      channel:
        item.snippet.channelTitle,

      publishedAt:
        item.snippet.publishedAt,

      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url,

      url:
        `https://www.youtube.com/playlist?list=${item.id.playlistId}`,
    })
  );
}

module.exports = {
  searchYouTubePlaylists,
};