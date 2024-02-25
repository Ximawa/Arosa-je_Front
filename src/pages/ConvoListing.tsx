import { useParams } from "react-router-dom";
import Conversation from "../components/Conversation";

const ConvoListing = () => {
  let { id } = useParams();
  const conversationId = id ? parseInt(id) : -1; // Convert id to number or use a default value
  return <Conversation id={conversationId} />;
};

export default ConvoListing;
