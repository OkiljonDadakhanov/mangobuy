import {Dialog} from "@headlessui/react";
import React, {useEffect, useState} from "react";
import OtpInput from "react-otp-input";

import Button from "../../Button/Button";
import css from "./style.module.css";

function OtpModal({
  isOpen,
  onClose,
  onSubmit,
  otp,
  setOtp,
  reSendOtp,
  loading,
  error,
  setError,
}) {
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    let intervalId;
    if (isOpen) {
      if (timer > 0) {
        intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }
    }

    return () => clearInterval(intervalId);
  }, [timer, isOpen]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendOTP = () => {
    reSendOtp();
    setTimer(60);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">
        <Dialog.Title className="text-xl font-semibold text-center">
          Verification
        </Dialog.Title>
        <OtpInput
          value={otp}
          onChange={(value) => {
            setOtp(value);
            setError(null);
          }}
          numInputs={6}
          inputType="number"
          containerStyle={css.otpInputContainer}
          inputStyle={
            error
              ? css.otpErrorStyle
              : otp.length === 6
              ? css.otpFocusStyle
              : css.otpInputStyle
          }
          renderInput={(props) => <input {...props} />}
        />
        {error && (
          <p className="text-red-500 mt-2 text-center">
            {error?.response?.data.detail}
          </p>
        )}
        <p className="text-center mt-4">Didn’t receive the code?</p>
        {timer !== 0 && <p className="text-center">{formatTime(timer)}</p>}
        {timer === 0 && (
          <button className={css.resendCode} onClick={handleResendOTP}>
            Resend Code
          </button>
        )}

        <div className="mt-6">
          <Button
            onClick={onSubmit}
            disabled={otp.length !== 6 || loading || error}
          >
            {loading ? "Loading..." : " Verify Payment"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default OtpModal;
