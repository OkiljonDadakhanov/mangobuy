import React, { useState } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const optionStyle = {
    position: 'absolute',
    width: '100%'
  }

  return (
    <div className="relative">
      <button
        className="  text-white  py-2 px-4 rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        <span>Валюта</span>
        <svg
          className="fill-current h-4 w-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6h12z" />
        </svg>
      </button>
      {isOpen && (
        <div className=" bg-white rounded-md shadow-lg" style={optionStyle}>
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              RUB
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              UZS
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
