"use client"; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {
    const [showText, setShowText] = useState(false);
    const [typingComplete, setTypingComplete] = useState(false);
    const [typedText, setTypedText] = useState("");
    const router = useRouter();
    
     const navigateToStream =() => {
        router.push('/stream');
     }
  
    const text = ' Hello!  I am your AI Advisor. I am here to help you with personalized advice, tailored just for you. Whether you need guidance on your projects, insights to improve your skills, or any other support, I’ve got you covered. Let’s get started and unlock your full potential together! To move forward, you need to select your stream. Click on the button below to start.';

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
            }, 50); 

            return () => clearInterval(interval);
        }
    }, [showText]);

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
            <div className="relative z-10 text-center max-w-2xl bg-white bg-opacity-60 p-6 rounded-lg">
                <h1 className="text-4xl text-black font-bold mb-4">Welcome to AI Advisor!</h1>
                {showText && (
                    <p className="text-2xl text-black font-bold">
                        {typedText}
                    </p>
                )}
                {typingComplete && (
                    <button  
                    onClick={navigateToStream}
                    className="mt-6 px-6 py-2 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition-all duration-300">
                        Start
                    </button>
                )}
            </div>
        </div>
    );
};

export default HomePage;
