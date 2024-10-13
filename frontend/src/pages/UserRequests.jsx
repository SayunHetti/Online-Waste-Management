import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id'); // Fetch user ID from local storage
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

                // Filter only ongoing requests (completed === false)
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
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#f8f9fc', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Your Ongoing Requests</h2>

            {loading ? (
                <div style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
                    <p>Loading...</p>
                    <div
                        className="loader"
                        style={{
                            border: '5px solid #ccc',
                            borderTop: '5px solid #28a745', // Green spinner
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto',
                        }}
                    ></div>
                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            ) : requests.length === 0 ? (
                <div style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
                    <p>You have no ongoing requests.</p>
                    <button
                        onClick={() => navigate('/add-request')}
                        style={{
                            marginTop: '15px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                    >
                        Add New Request
                    </button>
                </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#28a745', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Request ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Request Date</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Address</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Comments</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <tr key={req.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.id}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.requestDate}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.address}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.comments}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd', color: '#dc3545', fontWeight: 'bold' }}>
                                Ongoing
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {requests.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={() => navigate('/track')}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
                    >
                        Track My Request
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserRequests;
