import { useState } from "react";
import axios from "axios";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Send message to the Firebase function
  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { text: userMessage, sender: "user" }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Call Firebase function locally (emulator)
      const response = await axios.post("http://localhost:5001/firstproject-cecaa/us-central1/chatbotReply", {
        userMessage: userMessage,
      });

      const { reply, nextPrompt } = response.data;

      // Update chat with the bot's response
      setMessages([
        ...newMessages,
        { text: reply, sender: "bot" },
        { text: nextPrompt, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserMessage("");
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
            } p-3 mb-4 rounded-lg max-w-xs break-words`}
          >
            <p>{message.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="bg-gray-200 p-3 mb-4 rounded-lg max-w-xs break-words">
            Bot is typing...
          </div>
        )}
      </div>

      <div className="flex items-center p-4 bg-white shadow-lg rounded-lg mt-4">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-3 border border-gray-300 rounded-lg mr-4 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
