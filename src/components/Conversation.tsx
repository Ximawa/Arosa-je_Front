import { useEffect, useState } from "react";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";
import ConversationInput from "./ConversationInput";
import axios from "axios";
import { getJWTData } from "../utils/jwtUtils";

interface Props {
  id: number;
}

const Conversation = ({ id }: Props) => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(-1);

  const [messageSend, setMessageSend] = useState("");

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
        `http://127.0.0.1:8000/addMessage/`,
        {
          conversation_id: id,
          sender_id: userId,
          message: messageSend,
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
    const jwtData = getJWTData();

    if (jwtData) {
      // Access JWT data
      setUserId(jwtData.id);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/conversation/${id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error while fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, [messageSend]);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 min-h-[100vh] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.length === 0 ? (
        <p>Start the conversation!</p>
      ) : (
        messages.map((item: { message: string; sender_id: number }) =>
          item.sender_id === userId ? (
            <MessageSent>{item.message}</MessageSent>
          ) : (
            <MessageReceived>{item.message}</MessageReceived>
          )
        )
      )}

      <ConversationInput
        onChange={onChange}
        onSubmit={handleSubmit}
        message={messageSend}
      />
    </div>
  );
};

export default Conversation;
