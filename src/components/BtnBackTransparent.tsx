import { Link } from "react-router-dom";

interface Props {
  children: string;
  linkTo: string;
}
const BtnBackTransparent = ({ children, linkTo }: Props) => {
  return (
    <>
      <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <Link to={linkTo}>
          <span className="inline-block ml-1">{children}</span>
        </Link>
      </button>
    </>
  );
};

export default BtnBackTransparent;
