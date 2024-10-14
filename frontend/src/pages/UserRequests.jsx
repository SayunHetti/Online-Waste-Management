import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/UserRequests.css'; // Import the CSS file

const UserRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRequests = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/garbage-requests/get/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const ongoingRequests = response.data.filter(req => req.completed === false);
                setRequests(ongoingRequests);
            } catch (error) {
                console.error('Error fetching user requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRequests();
    }, [userId]);

    return (
        <div className="user-requests-container">
            <h2 className="header">Your Ongoing Requests</h2>

            {loading ? (
                <div className="loading">
                    <p>Loading...</p>
                    <div className="loader"></div>
                </div>
            ) : requests.length === 0 ? (
                <div className="no-requests">
                    <p>You have no ongoing requests.</p>
                    <button className="add-request-button" onClick={() => navigate('/add-request')}>
                        Add New Request
                    </button>
                </div>
            ) : (
                <table className="requests-table">
                    <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Request Date</th>
                        <th>Address</th>
                        <th>Comments</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.id}</td>
                            <td>{req.requestDate}</td>
                            <td>{req.address}</td>
                            <td>{req.comments}</td>
                            <td className="status-ongoing">Ongoing</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {requests.length > 0 && (
                <div className="track-button-container">
                    <button className="track-button" onClick={() => navigate('/track')}>
                        Track My Request
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserRequests;
