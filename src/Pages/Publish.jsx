import React, { useEffect, useState } from 'react';
import Nav from '../TopNav/Nav';

const Publish = () => {
  const [formNumber, setFormNumber] = useState('');
  const [formLink, setFormLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Always get formNumber from localStorage on mount
  useEffect(() => {
    const storedFormNumber = localStorage.getItem('formNumber');
    if (storedFormNumber) {
      setFormNumber(storedFormNumber);
    }
  }, []);

  // Check if formFields is empty
  const formFields = JSON.parse(localStorage.getItem('formFields') || '[]');
  const isFormEmpty = !formFields || formFields.length === 0;

 const publishForm = async () => {
  setIsLoading(true);
  setError(null);

  try {
    // Fix: Provide empty array as fallback string
    const formData = JSON.parse(localStorage.getItem('formFields') || '[]');
    
    const submitSettings = JSON.parse(
      localStorage.getItem('submitSettings') || 
      JSON.stringify({
        label: 'Submit',
        align: 'center',
        bgColor: '#2563eb',
        textColor: '#ffffff',
        fontSize: 'text-base',
      })
    );

    const formToSave = {
      formNumber,
      title: localStorage.getItem('formTitle') || 'Untitled Form',
      description: localStorage.getItem('formDesc') || '',
      fields: formData.map(field => ({
        ...field,
        value: field.value || '',
      })),
      submitSettings,
      createdAt: new Date().toISOString()
    };

    const response = await fetch('http://localhost/GR8_JOTFORM/Backend/save_form.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formToSave)
    });

    // First check if the response is JSON
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      throw new Error(`Server returned invalid JSON: ${text}`);
    }

    if (!response.ok) {
      throw new Error(result?.details || result?.message || 'Failed to save form');
    }

    setFormLink(result.formLink || `http://localhost:5173/form/${formNumber}`);
    
  } catch (err) {
    setError(err.message);
    console.error('Publish error:', err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Publish Your Form</h1>

          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Ready to Publish</h2>
              <p className="text-gray-600 mb-4">
                Click the button below to publish your form and get a shareable link.
              </p>
              <button
                onClick={publishForm}
                disabled={isLoading || isFormEmpty}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md disabled:opacity-50"
              >
                {isLoading ? 'Publishing...' : 'Publish Form'}
              </button>
              {isFormEmpty && (
                <p className="mt-2 text-sm text-red-500">
                  Please add at least one field to your form before publishing.
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                <p className="font-medium">Error: {error}</p>
                <p className="mt-2 text-sm">
                  Make sure your PHP server is running and CORS headers are set.
                </p>
              </div>
            )}

            {formLink && (
              <div className="p-6 border border-green-200 rounded-lg bg-green-50">
                <h2 className="text-lg font-semibold mb-2 text-green-800">Success!</h2>
                <p className="text-green-600 mb-4">Your form is now published at:</p>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={formLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(formLink);
                      alert('Link copied to clipboard!');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r-md"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-3 text-sm text-green-700">
                  Share this link with anyone who should fill out your form.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Publish;