import {useCallback, useState} from "react";
import API from "../utils/API";

function useGetGameServices() {
  const [gameServices, setGameServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getGameServices = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const data = await API.get("/products/list?game_id=" + id);
      setGameServices(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);
  return {
    gameServices,
    getGameServices,
    loading,
    error,
  };
}

export default useGetGameServices;
