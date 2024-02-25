import ConvoList from "../components/ConvoList.tsx";
import { getJWTData } from "../utils/jwtUtils.ts";

const ConvoListPage = () => {
  const jwtData = getJWTData();
  let idUser: number | undefined = jwtData?.id; // Initialize idUser with a default value of undefined

  return <ConvoList id={idUser ?? 0} />;
};

export default ConvoListPage;
