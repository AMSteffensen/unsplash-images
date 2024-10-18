const axios = require("axios");
const dotenv = require("dotenv");

// Load .env only in local development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

exports.handler = async function (event) {
  const searchTerm = event.queryStringParameters.query;
  const API_KEY = process.env.UNSPLASH_API_KEY;

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${searchTerm}`
    );
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins for development
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins for development
      },
      body: JSON.stringify({ error: "Error fetching images" }),
    };
  }
};
