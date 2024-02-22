import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

import BtnNext from "../components/BtnNextBlue";
import BtnBackTransparent from "../components/BtnBackTransparent";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      // Traitez la réponse de l'API selon vos besoins
      console.log("Réponse de l'API:", response.data);
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez réessayer.");
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
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
                    <span className="inline-block ml-1">Forgot Password</span>
                  </button>
                </div>
                <div className="text-center sm:text-right  whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-bottom	"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <BtnBackTransparent linkTo="/dashboard">
                  Back
                </BtnBackTransparent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
