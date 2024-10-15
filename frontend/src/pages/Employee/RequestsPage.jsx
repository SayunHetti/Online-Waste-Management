import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/CSS/RequestsPage.css'; // Import the CSS file

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'http://localhost:8080/api/requests/pending',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                setRequests(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleLocate = (id) => {
        navigate(`/map/${id}`);
    };

    return (
        <div className="requests-container">
            <h2 className="requests-header">Pending Requests</h2>

            {loading ? (
                <div style={{ textAlign: 'center', color: '#555' }}>
                    <p>Loading...</p>
                    <div className="loader"></div>
                </div>
            ) : requests.length === 0 ? (
                <div className="no-data">No data available</div>
            ) : (
                <table className="requests-table">
                    <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Area</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.id}</td>
                            <td>{req.area}</td>
                            <td>{req.address}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button
                                    className="request-action-button"
                                    onClick={() => handleLocate(req.id)}
                                >
                                    Locate
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RequestsPage;
