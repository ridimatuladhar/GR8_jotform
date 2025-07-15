import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SideBar = ({ onAddField }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quesDropdownOpen, setQuesDropdownOpen] = useState(false);
  const [headDropdownOpen, setHeadDropdownOpen] = useState(false);

  return (
    <aside className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-6">Form elements</h2>

      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Display text</span>
            <span>{dropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
          </button>

          {dropdownOpen && (
            <ul className="py-2 pl-6 space-y-2">
              <li>
                <button
                  onClick={() => setHeadDropdownOpen(!headDropdownOpen)}
                  className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <span className="flex-1 text-left">Headings</span>
                  <span>{headDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                </button>
                {headDropdownOpen && (
                  <ul className="py-2 flex gap-2">  {/* Changed to flex with gap */}
                    <li>
                      <button
                        onClick={() => onAddField('Heading1')}
                        className="px-4 py-2 hover:bg-gray-100 rounded border border-gray-200"
                      >
                        H1
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onAddField('Heading2')}
                        className="px-4 py-2 hover:bg-gray-100 rounded border border-gray-200"
                      >
                        H2
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => onAddField('Heading3')}
                        className="px-4 py-2 hover:bg-gray-100 rounded border border-gray-200"
                      >
                        H3
                      </button>
                    </li>
                  </ul>

                )}
              </li>

              <li><button onClick={() => onAddField('Paragraph')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">Paragraph</button></li>
              <li><button onClick={() => onAddField('Image')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">Image</button></li>
            </ul>
          )}
        </li>

        <li>
          <button
            onClick={() => setQuesDropdownOpen(!quesDropdownOpen)}
            className="flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span className="flex-1 text-left">Question types</span>
            <span>{quesDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
          </button>

          {quesDropdownOpen && (
            <ul className="py-2 pl-6 space-y-2">
              <li><button onClick={() => onAddField('Long')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">Long</button></li>
              <li><button onClick={() => onAddField('Short')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">Short</button></li>
              <li><button onClick={() => onAddField('MultipleAnswers')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">Multiple answers</button></li>
              <li><button onClick={() => onAddField('MCQ')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">MCQs (Single ans)</button></li>
              <li><button onClick={() => onAddField('ImageChoice')} className="block w-full text-left p-2 hover:bg-gray-100 rounded">Image choice</button></li>
            </ul>

          )}
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
