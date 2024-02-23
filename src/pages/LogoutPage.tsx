import React from "react";
import { Navigate } from "react-router-dom";

const Logout: React.FC = () => {
  React.useEffect(() => {
    // Supprimer le JWT du localStorage
    localStorage.removeItem("jwtToken");
  }, []);

  // Rediriger vers la page de connexion (/login) après la déconnexion
  return <Navigate to="/" />;
};

export default Logout;
