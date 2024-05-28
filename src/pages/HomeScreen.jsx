import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGetGameList from "../api/useGetGameList";
import Cards from "../components/GameCards";
import "../index.css";


function HomeScreen() {
  const {getGameList, gameList, loading, error} = useGetGameList()

  useEffect(() => {
    getGameList()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div className="container  ">
      <h1 className="text-4xl mt-10 text-white mb-10">Популярные игры</h1>
      <div className="h-screen cards_section flex flex-wrap justify-around mt-7">
 
          {gameList?.map((card) => (
            <Link to={`/games/${card.id}`} key={card.id}>
              <Cards
                key={card.id}
                src={card.image_url}
                name={card.name}
                page={`/games/${card.id}`}
              />  
            </Link>
          ))}
        </div>
      </div>
  
  );
}

export default HomeScreen;
