import React from 'react';
import { Search, Bell, UserCircle, PanelLeft } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 w-full">
      <div className="flex items-center justify-between h-16 px-8">
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <PanelLeft size={22} />
          </button>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-md">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search clusters, workflows, alerts..."
              className="bg-transparent ml-2 text-sm text-gray-700 w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Bell className="text-gray-600 hover:text-gray-800" size={22} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
          </div>
          <UserCircle className="text-gray-600 hover:text-gray-800" size={24} />
        </div>
      </div>
    </header>
  );
};

export default Header;

