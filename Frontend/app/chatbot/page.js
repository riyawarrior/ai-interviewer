"use client";
import ChatScreen from "./ChatScreen";

const ChatbotPage = () => {
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">History</h2>
          <ul>
            {/* Replace with dynamic history */}
            <li className="p-2 bg-gray-300 rounded mb-2 cursor-pointer">
              Chat 1
            </li>
            <li className="p-2 bg-gray-300 rounded mb-2 cursor-pointer">
              Chat 2
            </li>
          </ul>
        </div>

        {/* Chat Screen */}
        <div className="flex-1 bg-white">
          <ChatScreen />
        </div>
      </div>
    );
};

export default ChatbotPage;
