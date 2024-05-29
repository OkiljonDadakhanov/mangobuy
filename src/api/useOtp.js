import {useContext, useState} from "react";
import {Context} from "../context/ContextProvider";
import API from "../utils/API";

function useOtp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {paymentData, setPaymentData} = useContext(Context);

  const confirmOtp = async (otp) => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.post("/payments/confirm", {...paymentData, otp});
      console.log(res.data);
      setLoading(false);
      return {success: true};
    } catch (error) {
      setLoading(false);
      setError(error);
      return {success: false};
    }
  };

  const reSendOtp = async (card_number, expire_date, transaction_id) => {
    try {
      setLoading(true);
      setError(null);
      const parsedUUID = JSON.parse(localStorage.getItem("uuid"));

      const res = await API.post(
        "/payments/resend_otp",
        {
          card_number,
          expire_date,
          transaction_id,
        },
        {
          headers: {
            "user-uuid": parsedUUID,
          },
        }
      );

      console.log("resend payment data:", res.data);

      setLoading(false);
      setPaymentData(res.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {loading, error, confirmOtp, reSendOtp, setError};
}

export default useOtp;
