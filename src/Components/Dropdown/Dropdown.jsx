import React, { useState, useEffect, useRef } from 'react';
import downPNG from "../../assets/down.png";

const Dropdown = ({ options, onSelect, py2, horizontal, shapeValue }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [vw, setVw] = useState(window.innerWidth);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    closeDropdown();
  };

  const toggleDropdown = () => {
    vw <= 768 ? setIsOpen((prevIsOpen) => !prevIsOpen) : false
  };

  const closeDropdown = () => {
    setIsOpen(false)
  };

  const toggleDropdownTrue = () => {
    vw > 768 ? setIsOpen(true) : false
  };
  const toggleDropdownFalse = () => {
    vw > 768 ? setIsOpen(false) : false
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      vw <= 768 ? closeDropdown() : false
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', () => setVw(window.innerWidth))
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}
    onMouseEnter={toggleDropdownTrue}
    onMouseLeave={toggleDropdownFalse}
    >
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className={`flex items-center gap-2 justify-center w-full text-inherit ${py2? 'py-0' : 'py-2 px-4 border hover:bg-gray-100 font-medium text-gray-700'} text-sm bg-white border-gray-300 rounded-md`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {selectedOption.label}
          <img src={downPNG} className="w-4 h-fit object-cover" />
        </button>
      </div>

      {isOpen && (
                <div className="origin-top-right absolute right-0 w-fit pt-2">
          <div className="w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className={`p-2 ${horizontal ? 'flex gap-2': ''}`}
              role="menu"
              aria-orientation={horizontal ? 'horizontal' : 'vertical'}
              aria-labelledby="options-menu"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`block ${shapeValue ? '' : 'px-4 py-2'} text-sm text-gray-700 hover:bg-gray-100 w-full text-left`}
                  role="menuitem"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
