import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const FormBuilder = ({
  fields,
  onRemoveField,
  onUpdateField,
  onAddOption,
  onRemoveOption,
}) => {
  const [fieldImages, setFieldImages] = useState({});

  const handleImageChange = (imageList, fieldId) => {
    setFieldImages({ ...fieldImages, [fieldId]: imageList });
    onUpdateField(fieldId, { image: imageList[0]?.data_url });
  };

  const handleRemoveField = (id) => {
    if (window.confirm('Are you sure you want to remove this field?')) {
      onRemoveField(id);
    }
  };

  const navigator = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg col-span-1">
      {fields.map((field) => (
        <div
          key={field.id}
          className="mb-4 relative border border-gray-200 p-4 rounded-lg hover:border-gray-300 transition-colors group"
        >
          {/* Remove button */}
          <button
            onClick={() => handleRemoveField(field.id)}
            className="absolute -top-2 -right-2 bg-gray-500 text-white p-1 rounded-full hover:bg-gray-600 transition-colors shadow-md"
            aria-label={`Remove ${field.type} field`}
          >
            <IoMdClose size={14} />
          </button>

          {/* Image Upload Component */}
          {field.type === 'Image' && (
            <div className="mt-2">
              {!field.image ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        onUpdateField(field.id, { image: reader.result }); // Save base64
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <img src={field.image} alt="Uploaded" className="max-h-48 mb-2" />
                  <button
                    onClick={() => onUpdateField(field.id, { image: null })}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}


          {/* Input rendering */}
          {field.type === 'Heading1' && (
            <input
              type="text"
              placeholder="Enter heading"
              className="w-full text-xl font-bold p-2 border border-gray-300 rounded-md"
              value={field.value || ''}
              onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
            />
          )}

          {field.type === 'Heading2' && (
            <input
              type="text"
              placeholder="Enter heading"
              className="w-full text-lg font-bold p-2 border border-gray-300 rounded-md"
              value={field.value || ''}
              onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
            />
          )}

          {field.type === 'Heading3' && (
            <input
              type="text"
              placeholder="Enter heading"
              className="w-full text-md font-bold p-2 border border-gray-300 rounded-md"
              value={field.value || ''}
              onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
            />
          )}

          {field.type === 'Paragraph' && (
            <textarea
              placeholder="Enter paragraph"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              value={field.value || ''}
              onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
            />
          )}

          {field.type === 'Long' && (
            <div>
              <input
                type="text"
                placeholder="Enter your question here"
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                value={field.value || ''}
                onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
              />
              <textarea
                placeholder="Answer here"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
              />
            </div>
          )}

          {field.type === 'Short' && (
            <div>
              <input
                type="text"
                placeholder="Enter your question here"
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                value={field.value || ''}
                onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
              />
              <input
                type="text"
                placeholder="Answer here"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {field.type === 'MultipleAnswers' && (
            <div>
              <input
                type="text"
                placeholder="Enter your question"
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                value={field.value || ''}
                onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
              />

              {(field.options || []).map((option, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" disabled />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[idx] = e.target.value;
                      onUpdateField(field.id, { options: newOptions });
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => onRemoveOption(field.id, idx)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <IoMdClose size={14} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => onAddOption(field.id)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                + Add Option
              </button>
            </div>
          )}


          {field.type === 'MCQ' && (
            <div>
              <input
                type="text"
                placeholder="Enter your question"
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                value={field.value || ''}
                onChange={(e) => onUpdateField(field.id, { value: e.target.value })}
              />

              {(field.options || []).map((option, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <input type="radio" name={`mcq-${field.id}`} className="mr-2" disabled />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...field.options];
                      newOptions[idx] = e.target.value;
                      onUpdateField(field.id, { options: newOptions });
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => onRemoveOption(field.id, idx)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <IoMdClose size={14} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => onAddOption(field.id)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                + Add Option
              </button>
            </div>
          )}


{field.type === 'ImageChoice' && (
  <div className="space-y-4 p-4 border border-gray-300 rounded-md">
    {/* Question / Heading */}
    <input
      type="text"
      placeholder="Enter your question here"
      className="w-full p-2 border border-gray-300 rounded-md"
      value={field.question || ''}
      onChange={(e) => onUpdateField(field.id, { question: e.target.value })}
    />

    {/* Image Options */}
    <div className="space-y-2">
      {(field.options || []).map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Label input */}
          <input
            type="text"
            placeholder="Label"
            className="flex-1 p-2 border border-gray-300 rounded"
            value={option.label}
            onChange={(e) => {
              const newOptions = [...field.options];
              newOptions[index].label = e.target.value;
              onUpdateField(field.id, { options: newOptions });
            }}
          />

          {/* File input for image */}
          <input
            type="file"
            accept="image/*"
            className="p-2"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64Image = reader.result;
                  const newOptions = [...field.options];
                  newOptions[index].imageUrl = base64Image; // base64 string
                  newOptions[index].file = file;
                  onUpdateField(field.id, { options: newOptions });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          {/* Image preview */}
          {option.imageUrl && (
            <img
              src={option.imageUrl}
              alt={`Option ${index + 1}`}
              className="w-20 h-20 object-cover rounded "
            />
          )}

          {/* Remove Option */}
          <button
            onClick={() => {
              const newOptions = field.options.filter((_, i) => i !== index);
              onUpdateField(field.id, { options: newOptions });
            }}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Add new option */}
      <button
        onClick={() => {
          const newOptions = [...(field.options || []), { label: '', imageUrl: '' }];
          onUpdateField(field.id, { options: newOptions });
        }}
        className="mt-2 text-blue-600 hover:underline"
      >
        + Add Image Option
      </button>
    </div>
  </div>
)}




        </div>
      ))}

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No fields added yet</div>
      ) : (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigator('/settings')}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            Finished
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
