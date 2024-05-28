import {useCallback, useState} from "react";
import API from "../utils/API";

function useGetVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getVendors = useCallback(async (gameID) => {
    try {
      setLoading(true);
      setError(null);

      const data = await API.get("/games/vendor/list?game_id=" + gameID);
      setVendors(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);
  return {
    vendors,
    getVendors,
    loading,
    error,
  };
}

export default useGetVendors;
