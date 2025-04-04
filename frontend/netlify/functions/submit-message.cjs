const axios = require("axios");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({error: "Invalid Method"})};
  }
  const API_KEY = process.env.VITE_JSONBIN_API_KEY;
  const BIN_ID = process.env.VITE_JSONBIN_BIN_ID;

  try {
    const newMessage = JSON.parse(event.body);

    const getRes = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {"X-Master-Key": API_KEY}
    });
    const existing = (getRes.data.record.messages) || ([]);
    existing.push(newMessage);

    await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      messages: existing,
    }, {
      headers: {"Content-Type": "application/json", "X-Master-Key": API_KEY}
    });

    return {
      statusCode: 200,
      body: JSON.stringify({message: "Message has saved successfully!"})
    };
  } catch (messageError) {
    console.error("Submission error:", messageError);

    return {
      statusCode: 500,
      body: JSON.stringify({error: "Internal Server Error"})
    };
  }
};