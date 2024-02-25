import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  id_user: number;
  date: string;
}

const PostHeader = ({ id_user, date }: Props) => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await axios.get(
          `http://127.0.0.1:8000/users/${id_user}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setFullName(response.data.username);
      } catch (error) {
        console.error("Erreur lors de la récupération du user:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center p-2 justify-between bg-custom-light-brown border-custom-light-brown rounded">
      <div className="flex items-center">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/message3.jpg"
          className="rounded-full w-8 h-8 border border-gray-500"
        />
        <div className="flex flex-col ml-2">
          <span className="text-sm font-semibold">{fullName}</span>
        </div>
      </div>
      <span className="text-sm text-custom-dark-green font-bold ">{date}</span>
    </div>
  );
};

export default PostHeader;
