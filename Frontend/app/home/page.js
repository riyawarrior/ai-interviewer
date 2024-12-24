"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
    const [showText, setShowText] = useState(false);
    const [typingComplete, setTypingComplete] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    const router = useRouter();

    const text =
        "HHello! I am your AI Advisor. I am here to help you with personalized advice, tailored just for you. Whether you need guidance on your projects, insights to improve your skills, or any other support, I’ve got you covered. Let’s get started and unlock your full potential together! To move forward, you need to select your stream. Click on the button below to start.";

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showText) {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    setTypedText((prev) => prev + text.charAt(index));
                    index++;
                } else {
                    clearInterval(interval);
                    setTypingComplete(true);
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [showText]);

    const handleSelectStream = () => {
        setShowDialog(true);
        setShowText(false); // Hide introduction text
        setTypingComplete(false); // Hide welcome and button
    };

    const handleStreamSelection = (stream) => {
        // Navigate to the selected stream's page
        router.push(`/${stream.toLowerCase()}`);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/bg_gif.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Text content with white transparent background */}
            {!showDialog && (
                <div className="relative z-10 text-center max-w-lg bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
                    <Image
                        src="/transparent_ai_logo.png"
                        alt="AI Advisor"
                        className="mx-auto w-20 mb-4"
                    />
                    <h1 className="text-4xl text-white font-bold mb-6">
                        Welcome to AI Advisor!
                    </h1>
                    {showText && (
                        <p className="text-lg text-gray-200 font-medium mb-6">
                            {typedText}
                        </p>
                    )}
                    {typingComplete && (
                        <div className="space-y-4">
                            <button
                                onClick={handleSelectStream}
                                className="w-full px-6 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition-all duration-300"
                            >
                                Select Stream
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Stream Selection Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm text-center">
                        <h2 className="text-xl font-bold mb-4">Select Your Stream</h2>
                        <div className="space-y-4">
                            <button
                                onClick={() => handleStreamSelection("BTech")}
                                className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500"
                            >
                                BTech
                            </button>
                            <button
                                onClick={() => handleStreamSelection("Architecture")}
                                className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500"
                            >
                                Architecture
                            </button>
                            <button
                                onClick={() => handleStreamSelection("Business")}
                                className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-500"
                            >
                                Business
                            </button>
                        </div>
                        <button
                            onClick={() => setShowDialog(false)}
                            className="mt-4 px-4 py-2 bg-gray-500 text-black rounded-lg hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
