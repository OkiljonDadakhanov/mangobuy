import {Dialog} from "@headlessui/react";
import React from "react";

function PaymentModal({
  isOpen,
  onClose,
  setCardNumber,
  cardNumber,
  expireDate,
  handleExpireDateChange,
  error,
  onSubmit,
  loading,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">
        <Dialog.Title className="text-xl font-semibold">
          Enter Payment Details
        </Dialog.Title>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="number"
            value={cardNumber}
            onChange={(e) => {
              if (e.target.value.length <= 16) {
                setCardNumber(e.target.value);
              }
            }}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
            maxLength={16}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Expire Date
          </label>
          <input
            type="text"
            value={expireDate}
            onChange={handleExpireDateChange}
            placeholder="MM/YY"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 mt-2">{error?.response?.data.detail}</p>
        )}
        {/* Display error message */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default PaymentModal;
