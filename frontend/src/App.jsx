import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/Dashboard" element={<Dashboard />} />

                </Routes>
        </Router>
    );
};

export default App;
