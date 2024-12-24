"use client";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import {
  CameraIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Chatbot from "../../app/chatbot/page";

const BTechPage = () => {
  const router = useRouter();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const links = [
    { href: "/btech/topic1", label: "Topic 1" },
    { href: "/btech/topic2", label: "Topic 2" },
    { href: "/btech/topic3", label: "Topic 3" },
  ];

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <Sidebar title="BTech Topics" links={links} />
      <div className="flex-1 p-6 bg-gray-100 relative">
        <h1 className="text-2xl font-bold mb-4">BTech Chat Page</h1>
        <div className="absolute top-4 right-6 space-x-4 flex">
          {/* Camera Icon */}
          <button
            onClick={() => router.push("/camera")}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <CameraIcon className="h-6 w-6 mr-2" />
            Camera
          </button>

          {/* Chatbot Icon */}
          <button
            onClick={toggleChatbot}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 mr-2" />
            {isChatbotOpen ? "Close Chatbot" : "Chatbot"}
          </button>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <p>Chat or camera content for BTech will go here.</p>
        </div>

        {/* Chatbot */}
        {isChatbotOpen && (
          <div className="absolute bottom-4 h-auto top-20 right-6  w-1/3  border rounded-lg shadow-lg p-4">
            <Chatbot />
          </div>
        )}
      </div>
    </div>
  );
};

export default BTechPage;
