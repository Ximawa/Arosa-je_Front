import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnLightGreen from "../components/BtnLightGreen";
import CardEncyclopedia from "../components/CardEncyclopedia";

interface CardEnclyclopdia {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

const EncyclopediaPage = () => {
  const [plantes, setPlantes] = useState<CardEnclyclopdia[]>([]);
  const navigate = useNavigate();

  const handleClickNew = () => {
    navigate("/dashboard/encyclopedia/new"); // Replace "/some-path" with the desired path to redirect to
  };

  const HandleClick = (id: number) => {
    navigate(`/dashboard/encyclopedia/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await axios.get("http://127.0.0.1:8000/plantes/", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setPlantes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des plantes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container px-6 py-6">
      <BtnLightGreen onClick={handleClickNew}>Ajouter une plante</BtnLightGreen>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {plantes.length === 0 ? (
          <p>Aucune plante presente dans l'encyclopedie</p>
        ) : (
          plantes.map((item) => (
            <CardEncyclopedia
              key={item.id}
              id={item.id}
              name={item.name}
              onClick={(id: number) => HandleClick(id)}
            >
              Voir plus
            </CardEncyclopedia>
          ))
        )}
      </div>
    </div>
  );
};

export default EncyclopediaPage;
