import {useState} from "react";
import API from "../utils/API";

function useGetGameList() {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getGameList = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await API.get("/games/list");
      setGameList(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return {
    gameList,
    getGameList,
    loading,
    error,
  };
}

export default useGetGameList;
