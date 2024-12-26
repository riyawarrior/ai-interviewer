"use client";
import { useState,useEffect } from "react";
import ChatInput from "./ChatInput"
import { fetchQuestions } from "../utils/index";

const ChatScreen = () => {
    const [questionData, setQuestionData] = useState([]);
  const [error, setError] = useState(null);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchQuestions();
            setQuestionData(data); // Update state with fetched questions
          } catch (err) {
            setError(err.message);
          }
        };
        fetchData();
      }, []);

    
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
            <div style={{ marginTop: "20px" }}>
            {/* Render error if any */}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            
            {/* Render question data */}
            {questionData ? (
              <div style={{ color: "red" }}>
                <h3>Question:</h3>
                <p>{questionData.question}</p>

                <h3>Answer:</h3>
                <p>{questionData.answer}</p>

                <h3>Explanation:</h3>
                <p>{questionData.explanation}</p>
              </div>
            ) : (
              <p>Loading question...</p> // Show loading message while fetching
            )}
          </div>


        </div>
    );
};

export default ChatScreen;
