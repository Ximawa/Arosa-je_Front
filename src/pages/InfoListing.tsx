import { useParams } from "react-router-dom";
import DescListing from "../components/DescListing";

const InfoListing = () => {
  let { id } = useParams();
  const idUrl = Number(id); // Convert userId to number
  return (
    <div className="mx-auto px-4 py-4 max-w-xl my-auto">
      <DescListing id={idUrl} />
    </div>
  );
};

export default InfoListing;
