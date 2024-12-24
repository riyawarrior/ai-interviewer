"use client";
import { useState } from "react";
import ChatInput from "./ChatInput";

const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);

    const handleSend = (text) => {
        setMessages((prev) => [...prev, { sender: "user", text }]);

        // Simulating bot response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Thanks for your query! I'm processing it." },
            ]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 rounded-lg ${
                            message.sender === "bot"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-green-100 text-green-900 text-right"
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <ChatInput onSend={handleSend} />
        </div>
    );
};

export default ChatScreen;
