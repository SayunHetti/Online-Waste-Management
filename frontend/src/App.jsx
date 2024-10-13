
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import CreateGarbageRequest from './Components/CreateGarbageRequest';
import Register from './Components/ Register';
import Login from './Components/Login';
import ViewGarbageRequests from './Components/ViewGarbageRequests.jsx'
import UpdateGarbageRequest from './Components/UpdateGarbageRequest.jsx';

const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/add-request" element={<CreateGarbageRequest />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/view-requests" element={<ViewGarbageRequests />} />
            <Route path="/update-request/:userId/:requestId" element={<UpdateGarbageRequest />} />
        </Routes>
      </Router>
  );
};

export default App;