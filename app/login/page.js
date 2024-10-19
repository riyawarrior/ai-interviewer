"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in with:', email, password);
        router.push('/dashboard'); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
                {/* Logo section */}
                <div className="flex justify-center">
                <img 
                    src="/transparent_ai_logo.png" 
                    alt="AI Advisor Logo" 
                    className="w-24 h-auto mb-4" 
                />

                </div>
                {/* <h1 className="text-3xl font-bold text-white">AI Advisor</h1> */}
                <p className="text-gray-400">Please login to your account</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <a href="/forgot-password" className="text-pink-500">Forgot your password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">Or login with:</p>
                <div className="flex space-x-4">
                    <button className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600">Google</button>
                    <button className="w-full py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600">Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
