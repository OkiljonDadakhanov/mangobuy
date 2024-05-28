import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetGameServices from '../api/useGetGameServices';
import useGetVendors from '../api/useGetVendors';
import ServiceCard from '../components/ServiceCard';


function ServicesScreen() {
  const { gameID } = useParams();
  const { getGameServices, gameServices, loading, error } = useGetGameServices()
  const { vendors, getVendors, loading: loadingVendors, error: errorVendors } = useGetVendors()
  

  useEffect(() => {
    getGameServices(gameID)  
    getVendors(gameID)
  }, [gameID, getGameServices, getVendors]);


  if (loading || loadingVendors) return <p>Loading...</p>;
  if (error || errorVendors) return <p>Error: {error || errorVendors}</p>;

  return (
    <div className="cards_section flex flex-wrap justify-between mt-7">
      {gameServices?.map((card) => (
        <ServiceCard
          key={card.id}
          name={card.name}
          src={card.image_url}
          amount={card.amount}
          vendors={vendors}
          productId={card.id}
        />
      ))}
    </div>
  );
}

export default ServicesScreen;
