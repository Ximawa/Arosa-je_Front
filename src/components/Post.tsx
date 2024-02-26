import PostHeader from "../components/PostHeader";
import PostBody from "../components/PostBody";
import ConversationInput from "./ConversationInput";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getJWTData } from "../utils/jwtUtils";

const Post = () => {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [messageSend, setMessageSend] = useState("");
  const [userRole, setUserRole] = useState<number>(1);

  useEffect(() => {
    const jwdData = getJWTData();

    setUserRole(jwdData?.role);
  }, []);

  const onChange = (e: any) => {
    setMessageSend(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    const jwtData = getJWTData();

    if (jwtData) {
      // Access JWT data
      setUserId(jwtData.id);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/encyclopedie/createPost`,
        {
          plante_id: id,
          user_id: jwtData?.id,
          content: messageSend,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setMessageSend("");
    } catch (error) {
      console.error("Error during axios post request:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        const response = await axios.get(
          `http://127.0.0.1:8000/encyclopedie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des conseils:", error);
      }
    };

    fetchData();
  }, [messageSend]);

  return (
    <div className="mb-6 ">
      {posts.length === 0 ? (
        <p>Pas encore de conseil</p>
      ) : (
        posts.map(
          (item: {
            id: number;
            user_id: number;
            create_at: string;
            content: string;
          }) => (
            <div key={id}>
              <PostHeader
                id_user={item.user_id}
                date={item.create_at.slice(0, -7).replace("T", " ")}
              />
              <PostBody msg={item.content} />
            </div>
          )
        )
      )}
      {userRole == 1 ? (
        <></>
      ) : (
        <ConversationInput
          onChange={onChange}
          onSubmit={(e: React.FormEvent<Element>) => handleSubmit(e)}
          message={messageSend}
        />
      )}
    </div>
  );
};

export default Post;
