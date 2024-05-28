import {Dialog} from "@headlessui/react";
import React from "react";

function PlayerIdModal({
  isOpen,
  onClose,
  vendors,
  inputValues,
  handleInputChange,
  onSubmit,
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
          Enter Player ID
        </Dialog.Title>
        {vendors.map((vendor) => {
          return (
            <div className="mt-4" key={vendor.key}>
              <label className="block text-sm font-medium text-gray-700">
                {vendor.label}
              </label>
              <input
                type={vendor.input_type}
                value={inputValues[vendor.key] || ""}
                onChange={(e) => handleInputChange(vendor, e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          );
        })}
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
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default PlayerIdModal;
