import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const createPaymentApi = 'https://mangobuy.store/api/v1/payments/create';

function Transaction({ isOpen, onClose, playerID, productID }) {
  const [formData, setFormData] = useState({
    card_number: '',
    expire_date: '',
    otp: ''
  });
  const [transactionID, setTransactionID] = useState(null);
  const [sessionID, setSessionID] = useState(null);
  const [step, setStep] = useState(1);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handlePaymentSubmit = () => {
    axios.post(createPaymentApi, {
      card_number: formData.card_number,
      expire_date: formData.expire_date,
      product_id: productID,
      inputs: { player_id: playerID }
    })
    .then(response => {
      setTransactionID(response.data.transaction_id);
      setSessionID(response.data.session_id);
      setStep(2);
    })
    .catch(error => console.error(error));
  };

  const handleConfirmSubmit = () => {
    axios.post(confirmPaymentApi, {
      session_id: sessionID,
      transaction_id: transactionID,
      otp: formData.otp
    })
    .then(response => {
      console.log('Payment confirmed:', response.data);
      onClose();
    })
    .catch(error => console.error(error));
  };

 
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">
        <Dialog.Title className="text-xl font-semibold">Payment Details</Dialog.Title>
        {step === 1 && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                value={formData.card_number}
                onChange={(e) => handleChange('card_number', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Expire Date</label>
              <input
                type="text"
                value={formData.expire_date}
                onChange={(e) => handleChange('expire_date', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handleResendOtp}
                className="text-sm text-gray-500 hover:underline focus:outline-none"
              >
                Resend OTP
              </button>
              <div className="space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default Transaction;
