import axios from "axios";
import { useEffect, useState } from "react";
import CardListing from "./CardListing";
import { useNavigate } from "react-router-dom";

interface CardListing {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

interface Props {
  id: number;
}
const Listing = ({ id }: Props) => {
  const [listing, setListing] = useState<CardListing[]>([]);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/dashboard/convo/${id}`); // Replace "/some-path" with the desired path to redirect to
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `http://127.0.0.1:8000/listing/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setListing(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des annonces en cours:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {listing.length === 0 ? (
          <p>Pas de garde en cours</p>
        ) : (
          listing.map((item) => (
            <CardListing
              onClick={(id: number) => handleClick(id)}
              key={item.id}
              id={item.id}
              name={item.name}
              start_date={item.start_date.slice(0, -3).replace("T", " ")}
              end_date={item.end_date.slice(0, -3).replace("T", " ")}
            >
              Voir la conversation
            </CardListing>
          ))
        )}
      </div>
    </div>
  );
};

export default Listing;
