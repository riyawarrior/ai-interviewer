"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import {
  CameraIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const ArchitecturePage = () => {

  const router = useRouter();
  const links = [
    { href: "/architecture/topic1", label: "Topic 1" },
    { href: "/architecture/topic2", label: "Topic 2" },
    { href: "/architecture/topic3", label: "Topic 3" },
  ];





  return (
    <div className="flex">
      <Sidebar title="Architecture Topics" links={links} />
      <div className="flex-1 p-6 bg-gray-100 relative">
        <h1 className="text-2xl font-bold mb-4">ArchitectureChat Page</h1>
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
            onClick={() => router.push("/chatbot")}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 mr-2" />
            Chatbot
          </button>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <p>Chat or camera content for Architecture will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;
