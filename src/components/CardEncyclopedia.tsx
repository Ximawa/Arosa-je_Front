import axios from "axios";
import { useEffect, useState } from "react";
import BtnLightBrown from "./BtnLightBrown";

interface Props {
  id: number;
  name: string;
  onClick: (id: number) => void;
  children: string;
}
const CardEncyclopedia: React.FC<Props> = ({
  id,
  name,
  onClick,
  children,
}: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_image-encyclopedie/${id}`,
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

    getImage();

    // Clean up
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  return (
    <div className="w-full bg-custom-dark-green border-2 border-custom-light-brown p-4 rounded-lg sahdow-lg overflow-hidden flex flex-col justify-center items-center">
      <div>
        {imageSrc ? (
          <img src={imageSrc} alt={`Image ${id}`} />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      <div className="text-center py-8 sm:py-6">
        <p className="text-xl text-custom-light-brown font-bold mb-2">{name}</p>
      </div>
      <BtnLightBrown onClick={() => onClick(id)}>{children}</BtnLightBrown>
    </div>
  );
};

export default CardEncyclopedia;
