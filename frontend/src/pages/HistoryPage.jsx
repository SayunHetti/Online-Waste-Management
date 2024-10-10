import { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true); // Set loading to true before fetching
            const userId = localStorage.getItem('user_id');

            if (userId) {
                try {
                    const response = await axios.get(`/api/requests/completed?userId=${userId}`);
                    setHistory(response.data);
                } catch (err) {
                    setError('Error fetching history. Please try again later.');
                    console.error('Error fetching history:', err);
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            } else {
                setError('User ID not found in local storage');
                setLoading(false); // Set loading to false if no user ID is found
            }
        };

        fetchHistory();
    }, []);

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            padding: '30px',
            backgroundColor: '#f4f4f9',
            minHeight: '100vh'
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h2 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#333'
                }}>Completed Requests History</h2>
                <p style={{ color: '#666' }}>Track your past completed requests with details and images.</p>
            </div>

            {/* Display loading spinner while data is being fetched */}
            {loading ? (
                <div style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#555'
                }}>
                    <p>Loading history...</p>
                    <div style={{
                        border: '5px solid #ccc',
                        borderTop: '5px solid #28a745',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }}></div>
                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            ) : error ? (
                <div style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: '18px'
                }}>
                    <p>{error}</p>
                </div>
            ) : history.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: '#888'
                }}>
                    <p>No history available.</p>
                </div>
            ) : (
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    margin: '0 auto',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <thead>
                    <tr style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        textAlign: 'left'
                    }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Request ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Collection Date & Time</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Route</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Rating</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Proof</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((item) => (
                        <tr key={item.id} style={{
                            backgroundColor: '#fff',
                            borderBottom: '1px solid #ddd'
                        }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.id}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(item.collectedDateTime).toLocaleString()}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.route}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.rating}</td>
                            <td style={{
                                padding: '12px',
                                border: '1px solid #ddd',
                                textAlign: 'center'
                            }}>
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt="Waste Collection Proof" style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc'
                                    }} />
                                ) : (
                                    <span style={{ color: '#888' }}>No image available</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HistoryPage;
