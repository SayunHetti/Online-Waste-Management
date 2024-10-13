import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import MapPage from "./pages/RouteMap.jsx";
import FormSubmissionPage from "./pages/FormSubmissionPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import RequestTracking from "./pages/RequestTracking.jsx";
import UserRequests from "./pages/UserRequests.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<EmployeeLogin />} />
                <Route path="/track" element={<RequestTracking />} />
                <Route path="/ongoing" element={<UserRequests />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/map/:requestId" element={<MapPage />} />
                <Route path="/form-submission/:requestId" element={<FormSubmissionPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </Router>
    );
};

export default App
