import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function GameCoins({ onClick, src, name, amount, productId }) {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [playerID, setPlayerID] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOpenPlayerModal = () => {
    setIsPlayerModalOpen(true);
  };

  const handleClosePlayerModal = () => {
    setIsPlayerModalOpen(false);
  };

  const handleSubmitPlayerID = () => {
    setIsPlayerModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handleSubmitPayment = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate Inputs
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    const paymentData = {
      card_number: cardNumber,
      expire_date: expireDate,
      product_id: productId,
      inputs: { player_id: playerID },
      uuid: uuidv4(), // Generating UUID
    };

    console.log("Sending Payment Data:", paymentData); // Debugging: Log the payload

    axios
      .post("https://mangobuy.store/api/v1/payments/create", paymentData)
      .then((response) => {
        console.log("Payment Created:", response.data);
        setSuccess(true);
        setError(null);
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Payment Creation Error Response:",
            error.response.data
          );
          setError(`Payment Creation Error: ${error.response.data.detail}`);
        } else if (error.request) {
          console.error("Payment Creation No Response:", error.request);
          setError("Payment Creation Error: No response from server.");
        } else {
          console.error("Payment Creation Error:", error.message);
          setError(`Payment Creation Error: ${error.message}`);
        }
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
        setIsPaymentModalOpen(false);
      });
  };

  const handleExpireDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 3) {
      const month = value.slice(0, 2);
      const year = value.slice(2, 4);
      value = `${month}/${year}`;
    }

    setExpireDate(value);
  };

  const validateInputs = () => {
    if (!playerID.trim() || !cardNumber.trim() || !expireDate.trim()) {
      setError("All fields are required.");
      return false;
    }

    // Add more validation rules here if needed

    return true;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-5">
      <div
        onClick={handleOpenPlayerModal}
        className="p-3 transition-transform duration-300 ease-in-out hover:scale-40 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-blue-800 group-hover:bg-blue-800 text-black group-hover:text-red-500 font-bold cursor-pointer"
      >
        <img
          className="transform transition-transform duration-300 ease-in-out hover:scale-110"
          src={src}
          alt={name}
        />
        <p className="text-white mt-5">{name}</p>
        <p className="text-white group-hover:text-red-500 font-bold">
          {amount} UZS
        </p>
      </div>

      {success && (
        <p className="text-green-500 mt-4">Payment created successfully!</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Player ID Modal */}
      <Dialog
        open={isPlayerModalOpen}
        onClose={handleClosePlayerModal}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">
          <Dialog.Title className="text-xl font-semibold">
            Enter Player ID
          </Dialog.Title>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Player ID
            </label>
            <input
              type="text"
              value={playerID}
              onChange={(e) => setPlayerID(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleClosePlayerModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPlayerID}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>

      {/* Payment Modal */}
      <Dialog
        open={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
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
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleClosePaymentModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPayment}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default GameCoins;
