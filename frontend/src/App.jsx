import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";
import UnauthorizedHeader from "./components/UnauthorizedHeader.jsx";
import Profile from "./pages/Profile.jsx"; // Import the new header

const App = () => {
    return (
        <Router>
            <HeaderSwitch />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

const HeaderSwitch = () => {
    const location = useLocation();

    // Check if the current route is login or register
    if (location.pathname === "/login" || location.pathname === "/register") {
        return <UnauthorizedHeader />; // Render NonUserHeader for login and register pages
    }

    return <Header />; // Render the regular Header for other pages
};

export default App;

