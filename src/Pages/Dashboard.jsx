import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiBarChart2 } from 'react-icons/fi';
import axios from 'axios';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost/GR8_JOTFORM/Backend/get_form.php');
      if (response.data.success) {
        setForms(response.data.data);
      } else {
        throw new Error(response.data.error || 'Failed to fetch forms');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    
    try {
      const response = await axios.delete(`http://localhost/GR8_JOTFORM/Backend/delete_form.php?id=${formId}`);
      if (response.data.success) {
        setForms(forms.filter(form => form.id !== formId));
      } else {
        throw new Error(response.data.error || 'Failed to delete form');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateNewForm = () => {
  // Generate a unique form number (timestamp or UUID)
  const formNumber = Date.now().toString();
  // Store in localStorage for later use in Publish
  localStorage.setItem('formNumber', formNumber);
  // Navigate to /build/formNumber
  navigate(`/build/${formNumber}`);
};


  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong>Error:</strong> {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-gray-800">My Forms</h1>
  <button
    onClick={handleCreateNewForm}
    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
  >
    <FiPlus className="mr-2" />
    Create New Form
  </button>
</div>

      {forms.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-4">You haven't created any forms yet.</p>
         <button
    onClick={handleCreateNewForm}
    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  >
    <FiPlus className="mr-2" />
    Create New Form
  </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(form => (
           <div key={form.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
  <div className="flex justify-between items-start mb-4">
    <h2 className="text-xl font-semibold text-gray-800">
      {form.title || `Form ${form.id}`}
    </h2>
    <span className="text-sm text-gray-500">
      {new Date(form.created_at).toLocaleDateString()}
    </span>
  </div>

  {/* Description */}
  {form.description && (
    <p className="text-gray-600 text-sm mb-4">
      {form.description}
    </p>
  )}
  
  <div className="flex flex-wrap gap-3 mt-6">
    <Link
      to={`/form/${form.form_number}`}
      className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
    >
      <FiEye className="mr-2" />
      View
    </Link>
    
    <Link
      to={`/build/${form.form_number}`}
      className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
    >
      <FiEdit2 className="mr-2" />
      Edit
    </Link>
    
    <button
      onClick={() => handleDelete(form.id)}
      className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
    >
      <FiTrash2 className="mr-2" />
      Delete
    </button>
    
    <Link
      to={`/responses/${form.id}`}
      className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
    >
      <FiBarChart2 className="mr-2" />
      Responses
    </Link>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;