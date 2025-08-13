import React from 'react';
import { IoMdClose } from 'react-icons/io';

const FieldWrapper = ({ children, onRemove, field }) => (
  <div className="mb-4 relative border border-gray-200 p-4 rounded-lg hover:border-gray-300 transition-colors group">
    <button
      onClick={() => onRemove(field.id)}
      className="absolute -top-2 -right-2 bg-gray-500 text-white p-1 rounded-full hover:bg-gray-600 transition-colors shadow-md"
      aria-label={`Remove ${field.type} field`}
    >
      <IoMdClose size={14} />
    </button>
    {children}
  </div>
);

export default FieldWrapper;
