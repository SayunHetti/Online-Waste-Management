import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get('/api/requests/pending');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchRequests();
    }, []);

    const handleLocate = (id) => {
        navigate(`/map/${id}`);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Pending Requests</h2>

            {loading ? ( // Show loading effect while data is being fetched
                <div style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
                    <p>Loading...</p>
                    <div className="loader" style={{ border: '5px solid #ccc', borderTop: '5px solid #28a745', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            ) : requests.length === 0 ? ( // Check if there are no requests
                <div style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
                    <p>No data available</p>
                </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#28a745', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Request ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Waste Collection Place</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <tr key={req.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.id}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.wasteCollectionPlace}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                                <button
                                    onClick={() => handleLocate(req.id)}
                                    style={{
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                    }}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
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
