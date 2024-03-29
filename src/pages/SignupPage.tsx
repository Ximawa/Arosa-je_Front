import { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import BtnNext from "../components/BtnNextDarkGreen";
import SelectInput from "../components/SelectInput";
import logo from "../assets/logo_arosaje.png";

// TODO : separer les input form en composants
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");
  const [id_role, setIdRole] = useState("");
  const [error, setError] = useState("");

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("full_name", full_name);
      formData.append("id_role", id_role);
      formData.append("password", hashedPassword);

      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez réessayer.");
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-custom-dark-green flex flex-col ">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md lg:max-w-xl">
          <div>
            <img
              src={logo}
              alt="Logo de l'application"
              className="object-cover mx-auto"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200 ">
            <form onSubmit={handleSubmit}>
              <div className="px-5 py-7 grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                </div>
                <div className="col-span-2">
                  <SelectInput
                    htmlFor="role"
                    label="Choissisez un role"
                    options={roles}
                    onChange={(e) => setIdRole(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <BtnNext>Creer votre compte</BtnNext>
                </div>
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
                    <Link to="/">
                      <span className="inline-block ml-1">Connexion</span>
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

export default SignupPage;
