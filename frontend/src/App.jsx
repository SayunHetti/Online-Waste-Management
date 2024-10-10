import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import MapPage from "./pages/RouteMap.jsx";
import FormSubmissionPage from "./pages/FormSubmissionPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeLogin />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/map/:requestId" element={<MapPage />} />
                <Route path="/form-submission/:requestId" element={<FormSubmissionPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </Router>
    );
};

export default App
