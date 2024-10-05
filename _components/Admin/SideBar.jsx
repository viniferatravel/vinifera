'use client'
import { useState } from 'react';
import { Home, User, Settings, Menu } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`bg-gray-800 text-white h-screen p-5 flex flex-col space-y-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
                {/* Toggle Button */}
                <button onClick={toggleSidebar} className="text-2xl focus:outline-none">
                    <Menu />
                </button>

                {/* Menu Items */}
                <ul className="space-y-4">
                    <li className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                        <Link href={`/admin/dashboard`}>
                            <Home className="text-xl" />
                            {isOpen && <span className="ml-4">Dashboard</span>}
                        </Link>
                    </li>
                    <li className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                        <User className="text-xl" />
                        {isOpen && <span className="ml-4">Profile</span>}
                    </li>
                    <li className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                        <Settings className="text-xl" />
                        {isOpen && <span className="ml-4">Settings</span>}
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold">Main Content</h1>
                <p>This is your main content area.</p>
            </div>
        </div>
    );
};

export default Sidebar;
