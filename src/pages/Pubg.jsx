import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GameCoins from './GameCoins';

const baseCoins = 'https://mangobuy.store/api/v1/products/list?game_id=';

function Pubg() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(baseCoins + id)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cards_section flex flex-wrap justify-between mt-7">
      {data.map((card) => (
        <GameCoins
          key={card.id}
          name={card.name}
          src={card.image_url}
          amount={card.amount}
        />
      ))}
    </div>
  );
}

export default Pubg;
