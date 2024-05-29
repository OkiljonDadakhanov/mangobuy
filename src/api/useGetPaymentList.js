import {useCallback, useState} from "react";
import API from "../utils/API";

function useGetPaymentList() {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPaymentList = useCallback(async (page, limit) => {
    try {
      setLoading(true);
      setError(null);
      const parsedUUID = JSON.parse(localStorage.getItem("uuid"));

      const res = await API.get(
        `/payments/list?page_number=${page}&limit=${limit}`,
        {
          headers: {
            "user-uuid": parsedUUID,
          },
        }
      );
      setPaymentList(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);
  return {
    getPaymentList,
    paymentList,
    loading,
    error,
  };
}

export default useGetPaymentList;
