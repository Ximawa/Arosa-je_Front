import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

import BtnNext from "../components/BtnNextBlue";
import logo from "../assets/logo_arosaje.png";

// TODO : separer les forms en composant
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);

      // Hacher le mot de passe avant de l'envoyer
      const hashedPassword = await bcrypt.hash(password, 10);
      formData.append("password", hashedPassword);

      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { access_token } = response.data;
      localStorage.setItem("jwtToken", access_token);

      // Rediriger vers '/dashboard'
      console.log(response.data);
      navigate("/dashboard/card");
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez réessayer.");
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-custom-dark-green flex flex-col sm:py-12">
        <div className="p-6 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div>
            <img
              src={logo}
              alt="Logo de l'application"
              className="object-cover mx-auto"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <BtnNext>Next</BtnNext>
              </div>
            </form>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <Link to="/signup">
                      <span className="inline-block ml-1">
                        Creation de compte
                      </span>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
