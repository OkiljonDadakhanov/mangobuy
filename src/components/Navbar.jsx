import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="nav bg-gray-800 flex justify-around h-25 pt-7 ">
      <div className="nav-logo">
        <Link to={'/'}>
        <img 
        src={logo}
        alt='logo'
        className="h2-logo text-red-800 w-40 cursor-pointer  font-bold" />
        </Link>
      </div>

      <div className="nav-links">
        <ul className="list-none flex gap-5">
          <li className="nav-item text-white hover:text-lime-600 cursor-pointer rounded-md p-3">
            История транзакций
          </li>

          <li className="nav-item text-white  hover:text-lime-600 cursor-pointer rounded-md p-3">
            <Link
              to="https://t.me/Mangobuy_support"
              target="_blank"
              rel="noopener noreferrer"
            >
              Служба поддержки
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
