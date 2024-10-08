import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import React from 'react';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                </Routes>
        </Router>
    );
};

export default App;
