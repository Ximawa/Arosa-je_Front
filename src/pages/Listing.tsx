import axios from "axios";
import { useEffect, useState } from "react";
import CardListing from "../components/CardListing";

const Listing = () => {
  const [listing, setListing] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await axios.get("http://127.0.0.1:8000/listing", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setListing(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listing.length === 0 ? (
          <p>No actual listing</p>
        ) : (
          listing.map((item) => <CardListing key={item.id} />)
        )}
      </div>
    </div>
  );
};

export default Listing;
