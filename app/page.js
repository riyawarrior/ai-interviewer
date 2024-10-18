import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">Welcome to My App</h1>
                <p className="text-lg text-gray-400">
                    Please <Link href="/login" className="text-pink-500 hover:text-pink-600 underline">
                        log in
                    </Link> to continue.
                </p>
            </div>
        </div>
    );
};

export default HomePage;
