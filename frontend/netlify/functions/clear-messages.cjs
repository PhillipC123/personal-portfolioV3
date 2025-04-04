const axios = require("axios");

exports.handler = async () => {
  const API_KEY = process.env.VITE_JSONBIN_API_KEY;
  const BIN_ID = process.env.VITE_JSONBIN_BIN_ID;

  try {
    await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      messages: [],
    }, {
      headers: {"Content-Type": "application/json", "X-Master-Key": API_KEY}
    });

    return {
      statusCode: 200,
      body: JSON.stringify({message: "Messages have cleared successfully!"})
    };
  } catch (messageError) {
    console.error("Error clearing messages:", messageError);

    return {
      statusCode: 500,
      body: JSON.stringify({error: "Internal Server Error"})
    };
  }
};