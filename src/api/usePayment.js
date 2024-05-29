import {useContext, useState} from "react";
import {Context} from "../context/ContextProvider";
import API from "../utils/API";

function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setPaymentData, uuid} = useContext(Context);
  const payment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.post("/payments/create", paymentData, {
        headers: {
          "user-uuid": uuid,
        },
      });

      console.log("payment data:", res.data);
      setPaymentData(res?.data);

      setLoading(false);
      return {success: true};
    } catch (error) {
      setLoading(false);
      setError(error);
      return {success: false};
    }
  };
  return {loading, error, payment};
}

export default usePayment;
