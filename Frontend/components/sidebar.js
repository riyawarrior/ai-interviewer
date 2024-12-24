"use client";

import Link from "next/link";

const Sidebar = ({ title, links }) => {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href}>
                            <button className="w-full text-left p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
                                {link.label}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <Link href="/">
                    <button className="w-full p-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-white">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
