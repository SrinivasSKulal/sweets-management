import React from "react";
import './Navbar.css'
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const name = localStorage.getItem('username');
  const navigate = useNavigate();

   const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('access_tokens');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleAddSweet = () => navigate('/purchasesweets');
  const handleDeleteSweet = () => navigate('/restocksweets');

  
  return (
    <div className="navbar">
      <h1>Sweet Shop</h1>
      {name ? (
        <div className="user-menu">
          <span className="username" onClick={toggleDropdown}>
            {name} ▼
          </span>
          {dropdownOpen && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={handleAddSweet}>
                Purchase Sweet
              </div>
              <div className="dropdown-item" onClick={handleDeleteSweet}>
                ReStock Sweet
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Navbar