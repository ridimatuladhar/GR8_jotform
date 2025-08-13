import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  // Get current formNumber from localStorage
  const formNumber = localStorage.getItem('formNumber');

  // Define navigation items with formNumber in the path
  const navItems = [
    { path: `/build/${formNumber}`, label: 'Build' },
    { path: `/settings/${formNumber}`, label: 'Settings' },
    { path: `/publish/${formNumber}`, label: 'Publish' }
  ];

  return (
    <nav className="bg-black border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back to Dashboard button */}
          <Link
  to="/"
  onClick={() => {
    localStorage.clear(); // empties all localStorage items
  }}
  className="flex items-center text-gray-300 hover:text-white mr-4"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
  Back to Dashboard
</Link>


          {/* Navigation items */}
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
          
          {/* Empty div to balance the flex layout */}
          <div className="w-40"></div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;