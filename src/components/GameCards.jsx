import { Link } from "react-router-dom";
import "../index.css";
function CardSection({ src, name, page, onClick }) {
  return (
    <>
      <Link to={page} className="card-link">
        <div className=" max-w-sm rounded overflow-hidden shadow-lg m-5" onClick={onClick} >
          <div className="  group bg-gray-800  border border-gray-800 shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 " >
            <img
              src={src}
              alt="pubg"
              className=""
            />
            <p className="text-white font-mono mt-5 mb-3">{name}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardSection;
