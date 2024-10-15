import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/CSS/HistoryPage.css'; // Import the CSS file

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            const userId = localStorage.getItem('user_id');

            if (userId) {
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/requests/completed?userId=${userId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        }
                    );
                    const completedRequests = await Promise.all(response.data.map(async (request) => {
                        const collectionResponse = await axios.get(
                            `http://localhost:8080/api/waste-collection/get-by-request/${request.id}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                }
                            }
                        );
                        return { ...request, collection: collectionResponse.data };
                    }));

                    setHistory(completedRequests);
                } catch (err) {
                    setError('Error fetching history. Please try again later.');
                    console.error('Error fetching history:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('User ID not found in local storage');
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="history-page-container">
            <div className="history-page-header">
                <h2 className="history-page-title">Completed Requests History</h2>
                <p className="history-page-subtitle">Track your past completed requests with details and images.</p>
            </div>

            {loading ? (
                <div className="history-page-loading">
                    <p>Loading history...</p>
                    <div className="loader"></div>
                </div>
            ) : error ? (
                <div className="history-page-error">
                    <p>{error}</p>
                </div>
            ) : history.length === 0 ? (
                <div className="history-page-no-history">
                    <p>No history available.</p>
                </div>
            ) : (
                <table className="history-page-table">
                    <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Total Weight(Kg)</th>
                        <th>Food Waste(Kg)</th>
                        <th>E-Waste(Kg)</th>
                        <th>Recyclable Waste(Kg)</th>
                        <th>Regular Waste(Kg)</th>
                        <th>Collection Date & Time</th>
                        <th>Route</th>
                        <th style={{ textAlign: 'center' }}>Proof</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.totalWeight}</td>
                            <td>{item.foodWaste}</td>
                            <td>{item.ewaste}</td>
                            <td>{item.recyclableWaste}</td>
                            <td>{item.regularWaste}</td>
                            <td>
                                {item.collection ? new Date(item.collection.collectedDateTime).toLocaleString() : 'N/A'}
                            </td>
                            <td>{item.collection ? item.collection.route : 'N/A'}</td>
                            <td style={{ textAlign: 'center' }}>
                                {item.collection && item.collection.imageUrl ? (
                                    <img src={item.collection.imageUrl} alt="Waste Collection Proof" className="history-page-image" />
                                ) : (
                                    <span className="history-page-image-placeholder">No image available</span>
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
