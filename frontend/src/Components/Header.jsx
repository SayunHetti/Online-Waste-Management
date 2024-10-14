import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const role = localStorage.getItem('role');
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
                {role === 'USER' && (
                    <>
                        <Link to="/dashboard">
                            <button className="header-button">Dashboard</button>
                        </Link>

                        <Link to="/ongoing">
                            <button className="header-button">Ongoing</button>
                        </Link>
                        <Link to="/history">
                            <button className="header-button">History</button>
                        </Link>
                    </>
                )}

                {role === 'EMPLOYEE' && (


                    <Link to="/history">
                    <button className="header-button">History</button>
                    </Link>
                )}


                {role === 'ADMIN' && (
                    <>
                        <Link to="/Admin-rating">
                            <button className="header-button">Ratings</button>
                        </Link>
                        <Link to="/Admin-dashboard">
                            <button className="header-button">Admin Dashboard</button>
                        </Link>
                    </>

                )}

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
        </div>
    );
};

export default Header;
