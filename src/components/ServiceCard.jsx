import React, {useContext, useState} from "react";
import useOtp from "../api/useOtp";
import usePayment from "../api/usePayment";
import {Context} from "../context/ContextProvider";
import OtpModal from "./modals/OtpModal/OtpModal";
import PaymentModal from "./modals/PaymentModal";
import PlayerIdModal from "./modals/PlayerIdModal";
import SuccessPaymentModal from "./modals/SuccessPaymentModal/SuccessPaymentModal";

function ServiceCard({src, name, amount, productId, vendors}) {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessPaymentModalOpen, setIsSuccessPaymentModalOpen] =
    useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [otp, setOtp] = useState("");
  const [inputValues, setInputValues] = useState({});
  const {paymentData} = useContext(Context);
  const {payment, loading, error} = usePayment();
  const {
    confirmOtp,
    reSendOtp,
    loading: otpLoading,
    error: otpError,
    setError: setOtpError,
  } = useOtp();

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

  const handleCloseOtpModal = () => {
    setIsOtpModalOpen(false);
  };
  const formattedExpireDate = `${expireDate.slice(3, 5)}${expireDate.slice(
    0,
    2
  )}`;

  const handleSubmitPayment = async () => {
    const paymentData = {
      card_number: cardNumber,
      expire_date: formattedExpireDate,
      product_id: productId,
      inputs: inputValues,
    };

    console.log("Sending Payment Data:", paymentData);

    const res = await payment(paymentData);

    if (res.success) {
      setIsOtpModalOpen(true);
      handleClosePaymentModal();
    }
  };

  const handleSubmitOtpModal = async () => {
    const res = await confirmOtp(otp);

    if (res.success) {
      setIsSuccessPaymentModalOpen(true);
      handleCloseOtpModal();
    }
  };

  const handleReSendOtp = () => {
    reSendOtp(cardNumber, formattedExpireDate, paymentData.transaction_id);
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

  const handleInputChange = (vendor, value) => {
    // const regex = new RegExp(vendor.regex);
    // const isValid = regex.test(value);

    // console.log(isValid);

    setInputValues({
      ...inputValues,
      [vendor.key]: value,
    });
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

      {/* {error && <p className="text-red-500 mt-4">{error.message}</p>} Display error message */}

      {/* Player ID Modal */}
      <PlayerIdModal
        isOpen={isPlayerModalOpen}
        onClose={handleClosePlayerModal}
        vendors={vendors}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        onSubmit={handleSubmitPlayerID}
      />
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        setCardNumber={setCardNumber}
        cardNumber={cardNumber}
        expireDate={expireDate}
        handleExpireDateChange={handleExpireDateChange}
        loading={loading}
        error={error}
        onSubmit={handleSubmitPayment}
      />

      {/* Otp Modal */}

      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={handleCloseOtpModal}
        onSubmit={handleSubmitOtpModal}
        otp={otp}
        setOtp={setOtp}
        reSendOtp={handleReSendOtp}
        loading={otpLoading}
        error={otpError}
        setError={setOtpError}
      />

      {/* Success Payment Modal */}

      <SuccessPaymentModal
        isOpen={isSuccessPaymentModalOpen}
        onClose={() => setIsSuccessPaymentModalOpen(false)}
        onSubmit={() => setIsSuccessPaymentModalOpen(false)}
      />
    </div>
  );
}

export default ServiceCard;
