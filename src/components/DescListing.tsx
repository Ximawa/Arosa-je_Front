import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BtnLightBrown from "./BtnLightBrown";
import { getJWTData } from "../utils/jwtUtils";

interface Props {
  id: number;
}

const DescListing: React.FC<Props> = ({ id }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitles] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [start_date, setStartDate] = useState<string | null>(null);
  const [end_date, setEndDate] = useState<string | null>(null);

  const [id_listing, setIdListing] = useState<number | null>(null);
  const [proposer_id, setProposerId] = useState<number | null>(null);
  const [proposal_msg, setProposalMsg] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState<boolean | null>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `http://127.0.0.1:8000/get_proposal_created/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.data == null) {
          setIsVisible(false);
          console.log(isVisible);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
      }
    };

    fetchData();
    const jwtData = getJWTData();

    if (jwtData) {
      setProposerId(jwtData.id);
    }
    setIdListing(id);
    setProposalMsg("");
  }, []);

  const handleClickConvo = () => {
    navigate(`/dashboard/convo/${id}`);
  };

  const handleClickCreate = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const response = await axios.post(
      "http://127.0.0.1:8000/createProposal",
      {
        id_listing,
        proposer_id,
        proposal_msg,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    if (response.data) {
      const reponse_convo = await axios.post(
        "http://127.0.0.1:8000/createConversation",
        {
          proposal_id: response.data.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      navigate(`/dashboard/convo/${reponse_convo.data.id}`);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_listing/${id}`
        );
        setTitles(response.data.name);
        setDescription(response.data.description);
        setStartDate(response.data.start_date);
        setEndDate(response.data.end_date);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    const getImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_image/${id}`,
          {
            responseType: "arraybuffer",
          }
        );
        const blob = new Blob([response.data], { type: "image/*" });
        setImageSrc(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getInfo();
    getImage();

    // Clean up
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 md:bg-white md:shadow-xl rounded-lg mb-6 ">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://timesofindia.indiatimes.com/india/international-space-station-to-retire-in-2030-will-fall-into-pacific-ocean-a-year-later-nasa/articleshow/89392862.cms"
      >
        <div className="md:flex-shrink-0">
          {imageSrc ? (
            <img src={imageSrc} alt={`Image ${id}`} />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </a>

      <div className="py-1">
        <div className="p-4">
          <h2 className="truncate font-bold mb-2 md:mt-4 text-2xl text-gray-800 tracking-normal">
            {title}
          </h2>

          <p className="break-words text-sm text-gray-700 px-2 mr-1">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between p-2 md:p-4 md:mx-4">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://timesofindia.indiatimes.com/india/international-space-station-to-retire-in-2030-will-fall-into-pacific-ocean-a-year-later-nasa/articleshow/89392862.cms"
          >
            <div className="flex items-center">
              <div className="text-sm ml-2">
                <p className="text-black leading-none">
                  Du {start_date?.slice(0, -3).replace("T", " ")}
                </p>

                <p className="text-black">
                  Au {end_date?.slice(0, -3).replace("T", " ")}
                </p>
              </div>
            </div>
          </a>
          {isVisible ? (
            <></>
          ) : (
            <BtnLightBrown onClick={handleClickCreate}>
              Se porter volontaire
            </BtnLightBrown>
          )}
          <BtnLightBrown onClick={handleClickConvo}>
            Voir la conversation
          </BtnLightBrown>
        </div>
      </div>
    </div>
  );
};

export default DescListing;
