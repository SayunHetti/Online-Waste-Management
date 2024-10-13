import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        window.location.href = '/login'; // Redirect to login page
    };

    const goToProfile = () => {
        window.location.href = '/profile'; // Redirect to profile page
    };

    return (
        <div className="header">
            <div className="left-section">
                <img src="https://cdn2.iconfinder.com/data/icons/smarthome-filloutline/64/bin-smarthome-home-electronics-electronics-wifi-512.png" alt="Logo" className="logo" />
                <Link to="/dashboard">
                    <button className="header-button">Dashboard</button>
                </Link>
                <Link to="/profile">
                    <button className="header-button">Services</button>
                </Link>
                <Link to="/history">
                    <button className="header-button">History</button>
                </Link>
                <Link to="/ongoing">
                    <button className="header-button">Ongoing</button>
                </Link>
            </div>
            <div className="right-section">
                <div className="profile-icon-container" onClick={toggleDropdown}>
                    <img src="https://www.citypng.com/public/uploads/small/11639594308azjskddoutgi296zaayuhyuspofhahhfa4ezuhne7vcflkjlnicxnewkf17enf0janiemum3o1eikv5x9r1s6wst2obumnv3rmxj.png" alt="Profile" className="profile-icon" />
                </div>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <button className="dropdown-item" onClick={goToProfile}>Profile</button>
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            <style jsx>{`
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: darkgreen;
                    padding: 10px 20px;
                }
                .header-title {
                    margin-left: 550px; /* Space between logo and title */
                    font-size: 24px; /* Adjust the font size as needed */
                    color: black; /* Text color */
                }
                .left-section {
                    display: flex;
                    align-items: center;
                }
                .logo {
                    width: 40px;
                    height: auto;
                    margin-right: 10px;
                }
                .header-button {
                    margin-right: 15px;
                    padding: 5px 10px;
                    border: none;
                    background-color: yellow; /* Change to dark green */
                    color: black; /* Text color black */
                    cursor: pointer;
                    border-radius: 5px; /* Add rounded corners */
                }
                .header-button:hover {
                    background-color: #005700; /* Darker green on hover */
                    color: white;
                }
                .right-section {
                    display: flex;
                    align-items: center;
                    position: relative; /* Position relative for dropdown */
                }
                .profile-icon-container {
                    cursor: pointer;
                }
                .profile-icon {
                    width: 40px;
                    height: auto;
                }
                .dropdown {
                    position: absolute;
                    top: 100%; /* Align below the profile icon */
                    right: 0; /* Align to the right */
                    background-color: white;
                    border: 1px solid black;
                    border-radius: 5px; /* Rounded corners for dropdown */
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    z-index: 1000; /* Ensure dropdown is above other elements */
                    margin-top: 5px; /* Space between icon and dropdown */
                    min-width: 100px; /* Ensure a minimum width */
                }
                .dropdown-item {
                    padding: 10px 15px; /* Add left/right padding for spacing */
                    border: none;
                    background: none;
                    color: black; /* Text color black */
                    cursor: pointer;
                    width: 80%; /* Full width for better clicking */
                    border-radius: 5px; /* Rounded corners for dropdown items */
                    box-sizing: border-box; /* Ensure padding does not affect width */
                }
                .dropdown-item:hover {
                    background-color: lightgreen; /* Hover effect */
                }
            `}</style>
        </div>
    );
};

export default Header;
