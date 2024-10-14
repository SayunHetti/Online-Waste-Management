import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import './App.css'
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import MapPage from "./pages/RouteMap.jsx";
import FormSubmissionPage from "./pages/FormSubmissionPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import RequestTracking from "./pages/RequestTracking.jsx";
import UserRequests from "./pages/UserRequests.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/Header.jsx";
import UnauthorizedHeader from "./components/UnauthorizedHeader.jsx";
import Profile from "./pages/Profile.jsx"; // Import the new header
import CreateGarbageRequest from './Components/CreateGarbageRequest';
import ViewGarbageRequests from './Components/ViewGarbageRequests.jsx'
import UpdateGarbageRequest from './Components/UpdateGarbageRequest.jsx';
import BinSummary from "./pages/BinSummary.jsx";
const App = () => {
    return (
        <Router>
            <HeaderSwitch />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employeeLogin" element={<EmployeeLogin />} />
                <Route path="/track" element={<RequestTracking />} />
                <Route path="/ongoing" element={<UserRequests />} />
                <Route path="/bin-summary" element={<BinSummary />} />
                <Route path="/requests" element={<RequestsPage />} />
                <Route path="/map/:requestId" element={<MapPage />} />
                <Route path="/form-submission/:requestId" element={<FormSubmissionPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-request" element={<CreateGarbageRequest />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/view-requests" element={<ViewGarbageRequests />} />
                <Route path="/update-request/:userId/:requestId" element={<UpdateGarbageRequest />} />
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

