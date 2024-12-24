"use client";
import { useState } from "react";

const ChatInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText("");
        }
    };

    return (
        <div className="p-4 bg-gray-100 border-t border-gray-300 flex items-center">
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg mr-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
