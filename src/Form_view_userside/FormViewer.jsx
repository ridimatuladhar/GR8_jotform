import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const resolveAlignment = (alignment) => {
  switch (alignment) {
    case 'justify-left': return 'text-left';
    case 'justify-right': return 'text-right';
    case 'justify': return 'text-justify';
    case 'left': return 'text-left';
    case 'right': return 'text-right';
    default: return `text-${alignment || 'left'}`;
  }
};

const FormViewer = () => {
  const { formNumber } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost/GR8_jotform/Backend/form_view/get_form_by_number.php?formNumber=${formNumber}`
        );
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch form');
        
        // Normalize field IDs to ensure consistency
        const normalizedForm = {
          ...data.form,
          fields: data.form.fields?.map(field => ({
            ...field,
            id: field.id?.toString().startsWith('field-') ? field.id : `field-${field.id}`,
            settings: field.settings || {}
          })) || []
        };
        
        setForm(normalizedForm);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formNumber]);

  if (loading) return <div className="text-center py-12">Loading form...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!form) return <div className="text-center py-12">Form not found.</div>;

  const fields = form.fields || [];
  const submitSettings = form.submitSettings || {
    label: 'Submit',
    align: 'center',
    bgColor: '#2563eb',
    textColor: '#ffffff',
    fontSize: 'text-base',
  };

  const getHeadingStyle = (settings = {}) => ({
    textAlign: settings.align || 'left',
    color: settings.color || '#000000',
  });

  const getHeadingClass = (settings = {}) =>
    `${settings.fontSize || 'text-xl'} font-bold`;

  const renderField = (field, index) => {
    const settings = field.settings || {};
    const alignClass = resolveAlignment(settings.align);
    const textColor = settings.color || '#000000';

    switch (field.type) {
      case 'Heading':
        return (
          <div 
            key={field.id || index} 
            className={getHeadingClass(settings)} 
            style={getHeadingStyle(settings)}
          >
            {field.value}
          </div>
        );
      
      case 'Paragraph':
        return (
          <p 
            key={field.id || index} 
            className={`${settings.fontSize || 'text-base'} ${alignClass}`} 
            style={{ color: textColor }}
          >
            {field.value}
          </p>
        );
      
      case 'Image':
        return settings.image && (
          <div 
            key={field.id || index} 
            className={`${alignClass} my-4`}
          >
            <img 
              src={settings.image} 
              alt="" 
              className="rounded-lg max-w-full h-auto inline-block" 
            />
          </div>
        );
      
      case 'Short':
      case 'Long':
        return (
          <div key={field.id || index} className="mb-4">
            <label className="block text-gray-700 mb-1">
              {settings.label || 'Text Input'}
            </label>
            <input
              type={field.type === 'Short' ? 'text' : 'textarea'}
              className="w-full p-2 border rounded"
              placeholder={settings.placeholder || ''}
            />
          </div>
        );
      
      case 'MCQ':
      case 'MultipleAnswers':
        return (
          <div key={field.id || index} className="mb-4">
            <label className="block text-gray-700 mb-2">
              {settings.label || (field.type === 'MCQ' ? 'Multiple Choice' : 'Multiple Answers')}
            </label>
            <div className="space-y-2">
              {(field.options || []).map((option, i) => (
                <div key={i} className="flex items-center">
                  <input
                    type={field.type === 'MCQ' ? 'radio' : 'checkbox'}
                    name={`q-${field.id}`}
                    className="mr-2"
                  />
                  <span>{option.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'ImageChoice':
        return (
          <div key={field.id || index} className="mb-4">
            <label className="block text-gray-700 mb-2">
              {settings.label || 'Image Choice'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(field.options || []).map((option, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  {option.imageUrl && (
                    <img 
                      src={option.imageUrl} 
                      alt={option.label || ''} 
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-2 text-center">
                    {option.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-8">
          <h1 className="text-2xl font-bold text-gray-800">{form.title || 'Untitled Form'}</h1>
          {form.description && (
            <p className="text-gray-600">{form.description}</p>
          )}
          
          {fields.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              This form doesn't contain any fields yet.
            </div>
          ) : (
            fields.map(renderField)
          )}
        </div>

        {fields.length > 0 && (
          <div className={`px-6 pb-6 ${resolveAlignment(submitSettings.align)}`}>
            <button
              type="submit"
              className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm ${submitSettings.fontSize}`}
              style={{
                backgroundColor: submitSettings.bgColor,
                color: submitSettings.textColor,
              }}
            >
              {submitSettings.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormViewer;