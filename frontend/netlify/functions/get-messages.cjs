const axios = require("axios");

exports.handler = async () => {
  const API_KEY = process.env.VITE_JSONBIN_API_KEY;
  const BIN_ID = process.env.VITE_JSONBIN_BIN_ID;

  try {
    const res = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {"X-Master-Key": API_KEY}
    });

    const messages = (res.data.record.messages) || ([]);

    return {
      statusCode: 200,
      body: JSON.stringify(messages),
    };
  } catch (messageError) {
    console.error("Error retrieving message:", messageError);
    
    return {
      statusCode: 500,
      body: JSON.stringify({error: "Internal Server Error"}),
    };
  }
};