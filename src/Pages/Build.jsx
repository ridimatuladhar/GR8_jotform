import React, { useState, useEffect } from 'react';
import SideBar from '../Form_elements/SideBar';
import FormBuilder from '../Form_Body/FormBuilder';
import Nav from '../TopNav/Nav';

const Build = () => {
  const [fields, setFields] = useState(() => {
    const savedFields = localStorage.getItem('formFields');
    return savedFields ? JSON.parse(savedFields) : [];
  });

  useEffect(() => {
    localStorage.setItem('formFields', JSON.stringify(fields));
  }, [fields]);

  const addField = (type) => {
  const id = Date.now();

  let newField = {
    id,
    type,
    value: '',
  };

  if (type === 'MCQ') {
    newField.options = ['', ''];
    newField.correctAnswer = null;
  }

  if (type === 'MultipleAnswers') {
    newField.options = ['', ''];
    newField.correctAnswers = [];
  }

  setFields((prev) => [...prev, newField]);
};


  const removeField = (id) => {
    setFields(prev => prev.filter(field => field.id !== id));
  };

const updateField = (id, updatedData) => {
  setFields(prev =>
    prev.map(field =>
      field.id === id ? { ...field, ...updatedData } : field
    )
  );
};

  const addOption = (id) => {
    setFields(prev =>
      prev.map(field =>
        field.id === id
          ? { ...field, options: [...(field.options || []), ''] }
          : field
      )
    );
  };

  const removeOption = (id, indexToRemove) => {
    setFields(prev =>
      prev.map(field => {
        if (field.id === id) {
          const newOptions = [...(field.options || [])];
          newOptions.splice(indexToRemove, 1);
          return { ...field, options: newOptions };
        }
        return field;
      })
    );
  };

  const clearAllFields = () => {
    if (window.confirm('Clear all fields?')) {
      setFields([]);
      localStorage.removeItem('formFields');
    }
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-72 flex-shrink-0">
              <SideBar onAddField={addField} />
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <FormBuilder
                  fields={fields}
                  onRemoveField={removeField}
                   onUpdateField={updateField}
                  onAddOption={addOption}
                  onRemoveOption={removeOption}
                  onClearFields={clearAllFields}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Build;
