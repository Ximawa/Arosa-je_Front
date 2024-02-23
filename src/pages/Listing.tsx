import axios from "axios";
import { useEffect, useState } from "react";
import CardListing from "../components/CardListing";

const Listing = () => {
  const [listing, setListing] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/listing");
        setListing(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="flex flex-wrap -mx-4">
        {listing.length === 0 ? (
          <p>No actual listing</p>
        ) : (
          listing.map((item) => <CardListing key={item.id} />)
        )}
      </div>
      {listing.map((item) => (
        <CardListing key={item.id} />
      ))}
    </div>
  );
};

export default Listing;
