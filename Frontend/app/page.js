"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const [animateText, setAnimateText] = useState(false);

    useEffect(() => {
        setAnimateText(true);
    }, []);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Animated background shapes */}
            <div className="absolute w-72 h-72 bg-pink-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-blue-600 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse bottom-10 right-10"></div>

            <div className={`text-center space-y-6 transition-all duration-1000 ${animateText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Logo with hover scaling effect */}
                <Image
                  src="/transparent_ai_logo.png" 
                  alt="AI Advisor Logo" 
                  width={250}
                  height={150}
                  className="mx-auto w-49 h-auto hover:scale-110 transition-transform duration-500 ease-in-out"
                />

                {/* Animated text */}
                <h1 className="text-4xl font-bold transition-transform duration-500 ease-out hover:text-pink-500">
                    Welcome to My App
                </h1>

                <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors duration-300">
                    Please <Link href="/login" className="text-pink-500 hover:text-pink-600 underline transition-all duration-300 ease-in-out">
                        log in
                    </Link> to continue.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
