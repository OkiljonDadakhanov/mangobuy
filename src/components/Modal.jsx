import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

function Modal({ isOpen, onClose, fields, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialFormState = fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {});
    setFormData(initialFormState);
  }, [fields]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      const value = formData[field.key];
      if (field.regex && !new RegExp(field.regex).test(value)) {
        newErrors[field.key] = `Invalid ${field.label}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">
        <Dialog.Title className="text-xl font-semibold">Enter Player ID</Dialog.Title>
        {fields.map(field => (
          <div key={field.id} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.input_type}
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder={field.label}
              required
            />
            {errors[field.key] && <p className="text-red-500 text-sm">{errors[field.key]}</p>}
          </div>
        ))}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
