import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();

  // Define navigation items
  const navItems = [
    { path: '/', label: 'Build' },
    { path: '/settings', label: 'Settings' },
    { path: '/publish', label: 'Publish' }
  ];

  return (
    <nav className="bg-black border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <ul className="flex space-x-2 md:space-x-8 bg-gray-800 px-2 py-1 rounded-lg border border-gray-700">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-md font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;