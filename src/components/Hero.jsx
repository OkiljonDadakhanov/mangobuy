import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./GameCards";
import "../index.css";

const baseURL = "https://mangobuy.store/api/v1/games/list";

function Hero() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(baseURL)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
 
          {data?.map((card) => (
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

export default Hero;
