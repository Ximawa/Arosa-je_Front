import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJWTData } from "../utils/jwtUtils";

// TODO: ajouter preview img a upload

const NewListing = () => {
  const [id_user, setIdUser] = useState(-1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  useEffect(() => {
    // Récupérez les données du JWT
    const jwtData = getJWTData();

    if (jwtData) {
      // Accédez aux données du JWT
      setIdUser(jwtData.id);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]);
      setPreviewURL(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/CreateListing",
        {
          id_user,
          name,
          description,
          photo: file?.name,
          start_date: startDate?.toISOString().slice(0, -8).replace("T", " "),
          end_date: endDate?.toISOString().slice(0, -8).replace("T", " "),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (file && response.data.id) {
        // Check if file and folderName are defined
        const formData = new FormData();
        formData.append("file", file);
        try {
          const uploadResponse = await fetch(
            `http://127.0.0.1:8000/upload/${response.data.id}`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            throw new Error(
              `Erreur HTTP : ${uploadResponse.status} - ${uploadResponse.statusText}`
            );
          }

          console.log("Fichier envoyé avec succès.");
          navigate("/dashboard/card");
        } catch (error) {
          setError("Erreur lors de l'envoie de la photo");
          console.error("Erreur lors de l'envoi du fichier :", error);
        }
      } else {
        console.error("File or folderName is not defined.");
      }
    } catch (error) {
      setError("Erreur lors de la creation de l'annonce");
      console.error("Erreur lors de la connexion:", error);
    }
  };

  // TODO split en composant
  return (
    <div className="mx-auto mt-4 w-full overflow-hidden max-w-[550px]">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form action="https://formbold.com/s/FORM_ID" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Titre de l'annonce
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <label
            htmlFor="description"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Descriptif de l'annonce
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descriptif..."
          ></textarea>
        </div>

        <div className="-mx-3 flex flex-wrap">
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="start_date"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date debut
              </label>
              <input
                type="datetime-local"
                value={startDate ? startDate.toISOString().slice(0, -8) : ""}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                name="start_date"
                id="start_date"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div className="w-full px-3 sm:w-1/2">
            <div className="mb-5">
              <label
                htmlFor="end_date"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Date fin
              </label>
              <input
                type="datetime-local"
                value={endDate ? endDate.toISOString().slice(0, -8) : ""}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                name="end_date"
                id="end_date"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="-mx-3 my-3 flex flex-wrap">
          {previewURL && (
            <div className="mx-auto">
              <img
                src={previewURL}
                alt="Preview"
                className="max-w-full h-auto"
              />
            </div>
          )}
          <label
            htmlFor="dropzone-file"
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Photo de la plante concernée
            </h2>

            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your file PNG, JPG.{" "}
            </p>
          </label>

          <input
            id="dropzone-file"
            name="dropzone-file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div>
          <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewListing;
