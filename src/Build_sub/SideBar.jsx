import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SideBar = ({ onAddField }) => {

  return (
    <aside className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-6">Form elements</h2>

      <ul className="space-y-2">
        {/* Headings dropdown */}
        <li>
          <button
            onClick={() => onAddField('Heading')}
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Headings</span>
          </button>
          
        </li>

        {/* Converted display text items to buttons */}
        <li>
          <button 
            onClick={() => onAddField('Paragraph')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Paragraph</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => onAddField('Image')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Image</span>
          </button>
        </li>

        {/* Converted question types to buttons */}
        <li>
          <button 
            onClick={() => onAddField('Long')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Long Answer</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => onAddField('Short')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Short Answer</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => onAddField('MultipleAnswers')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Checkbox</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => onAddField('MCQ')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">MCQs (Single answer)</span>
          </button>
        </li>
        <li>
          <button 
            onClick={() => onAddField('ImageChoice')} 
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Image Choice</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;