import React, { useState, useEffect } from 'react';
import SideBar from '../Build_sub/SideBar';
import FormBuilder from '../Build_sub/FormBuilder';
import Nav from '../TopNav/Nav';
import { useParams } from 'react-router-dom';

const defaultSettings = {
  fontSize: 'text-base',
  align: 'left',
  color: '#000000',
};

const Build = () => {
  const { formNumber } = useParams();
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitSettings, setSubmitSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load form data
  useEffect(() => {
    const loadFormData = async () => {
      setIsLoading(true);

      if (formNumber) {
        try {
          const response = await fetch(
            `http://localhost/GR8_jotform/Backend/form_view/get_form_by_number.php?formNumber=${formNumber}`
          );
          const result = await response.json();

          if (result.success && result.form) {
            const formData = result.form;

            const normalizedFields = formData.fields?.map((field) => ({
              ...field,
              id: field.id?.toString().startsWith('field-') ? field.id : `field-${field.id}`,
              settings: field.settings || defaultSettings,
            })) || [];

            setFields(normalizedFields);
            setTitle(formData.title || '');
            setDescription(formData.description || '');
            setSubmitSettings(formData.submitSettings || {});

            localStorage.setItem('formFields', JSON.stringify(normalizedFields));
            localStorage.setItem('formTitle', formData.title || '');
            localStorage.setItem('formDesc', formData.description || '');
            localStorage.setItem('submitSettings', JSON.stringify(formData.submitSettings || {}));
            localStorage.setItem('formNumber', formNumber);
          } else {
            const savedFields = JSON.parse(localStorage.getItem('formFields') || 'null');
            if (savedFields && savedFields.length > 0 && localStorage.getItem('formNumber') === formNumber) {
              setFields(savedFields);
              setTitle(localStorage.getItem('formTitle') || '');
              setDescription(localStorage.getItem('formDesc') || '');
              setSubmitSettings(JSON.parse(localStorage.getItem('submitSettings') || '{}'));
            } else {
              setFields([]);
              setTitle('');
              setDescription('');
              setSubmitSettings({});
            }
          }
        } catch (error) {
          console.error('Error loading form:', error);
          const savedFields = JSON.parse(localStorage.getItem('formFields') || 'null');
          if (savedFields && savedFields.length > 0 && localStorage.getItem('formNumber') === formNumber) {
            setFields(savedFields);
            setTitle(localStorage.getItem('formTitle') || '');
            setDescription(localStorage.getItem('formDesc') || '');
            setSubmitSettings(JSON.parse(localStorage.getItem('submitSettings') || '{}'));
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setFields([]);
        setTitle('');
        setDescription('');
        setSubmitSettings({});
        setIsLoading(false);
      }
    };

    loadFormData();
  }, [formNumber]);

  // Save fields to localStorage whenever they change
  useEffect(() => {
    if (fields.length > 0) {
      localStorage.setItem('formFields', JSON.stringify(fields));
    }
  }, [fields]);

  // Add new field
  const addField = (type) => {
    const id = `${Date.now()}-${Math.random()}`;

    const baseField = {
      id,
      type,
      value: '',
      settings: { ...defaultSettings },
    };

    if (type === 'MCQ' || type === 'MultipleAnswers') {
      baseField.options = [
        { value: '', correct: false },
        { value: '', correct: false },
      ];
    }

    if (type === 'ImageChoice') {
      baseField.options = [{ label: '', imageUrl: '', isCorrect: true }];
      baseField.question = '';
    }

    if (type === 'Image') {
      baseField.image = null;
    }

    setFields((prev) => [...prev, baseField]);
  };

  // Remove a field
  const removeField = (id) => setFields((prev) => prev.filter((f) => f.id !== id));

  // Update a field
  const updateField = (id, updatedData) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          // Keep actual image URL but also add hasImage flag
          const newSettings = {
            ...updatedData.settings,
            hasImage: !!updatedData.settings?.image,
          };
          return { ...field, ...updatedData, settings: newSettings };
        }
        return field;
      })
    );
  };

  // Add/remove options
  const addOption = (id) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          const newOption =
            field.type === 'ImageChoice'
              ? { label: '', imageUrl: '', isCorrect: false }
              : { value: '', correct: false };
          return { ...field, options: [...(field.options || []), newOption] };
        }
        return field;
      })
    );
  };

  const removeOption = (id, index) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id === id && Array.isArray(field.options)) {
          const updatedOptions = [...field.options];
          updatedOptions.splice(index, 1);
          return { ...field, options: updatedOptions };
        }
        return field;
      })
    );
  };

  // Reorder fields
  const reorderFields = (newFields) => setFields(newFields);

  // Clear all fields
  const clearAllFields = () => {
    if (window.confirm('Clear all fields?')) {
      setFields([]);
      localStorage.removeItem('formFields');
    }
  };

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-xl">Loading form...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0">
              <SideBar onAddField={addField} />
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <FormBuilder
                  fields={fields}
                  setFields={setFields}
                  onRemoveField={removeField}
                  onUpdateField={updateField}
                  onAddOption={addOption}
                  onRemoveOption={removeOption}
                  onClearFields={clearAllFields}
                  onReorderFields={reorderFields}
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
