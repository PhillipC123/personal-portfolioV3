import { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/.netlify/functions/get-messages");
        const data = await response.json();

        if (response.ok) {
          setMessages(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch messages properly.");
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const clearMessages = async () => {
    try {
      const response = await fetch("/.netlify/functions/clear-messages", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setMessages([]);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to clear messages");
      console.error("Error clearing messages:", error);
    }
  };

  return (
    <div className="messages-page">
      <h2>Messages</h2>
      {(error) && <p>{error}</p>}
      {(!messages.length) && (!error) && <p>No messages yet.</p>}
        {(!!messages.length) && (
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <h3>{msg.subject}</h3>
                <p><strong>{msg.name}</strong>: "{msg.message}"</p>
              </li>
            ))}
          </ul>
        )}
      <button type="submit" className="btn btn-primary" onClick={clearMessages}>
        Clear Messages
      </button>
    </div>
  );
};

export default Messages;