import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/ViewGarbageRequests.css';

const ViewGarbageRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [redeemPoints, setRedeemPoints] = useState(0);
    const [redeemPrice, setRedeemPrice] = useState(0);
    const [fineAmount, setFineAmount] = useState(0);
    const [totalWeightBill, setTotalWeightBill] = useState(0);
    const [totalBill, setTotalBill] = useState(0);
    const navigate = useNavigate();
    const areaCharges = {
        'District 1': 50,  // Colombo
        'District 2': 60,  // Gampaha
        'District 3': 70,  // Kaluthara
        'District 4': 80,  // Galle
        'District 5': 90,  // Mathara
        'District 6': 100, // Hambanthota
        'District 7': 65,  // Negombo
        'District 8': 75,  // Kandy
        'District 9': 55,  // Rathnapura
        'District 10': 85, // Badulla
        'District 11': 70, // Jaffna
        'District 12': 60, // Mulative
        'District 13': 50, // Chilaw
        'District 14': 90, // Ampara
        'District 15': 80, // Polonnaruwa
    };

    const [extraCharge, setExtraCharge] = useState(0);
    const [extraChargeDescription, setExtraChargeDescription] = useState('');
    useEffect(() => {
        const fetchRequests = async () => {
            const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                setError('User is not authenticated');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/garbage-requests/get/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                setRequests(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching requests:', err);
                setError('An error occurred while fetching the requests.');
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    useEffect(() => {
        // Filter out completed requests for calculations
        const activeRequests = requests.filter(request => !request.completed);

        const totalRecyclableWaste = activeRequests.reduce((sum, request) => sum + (request.recyclableWaste || 0), 0);
        const roundedRecyclableWaste = Math.round(totalRecyclableWaste);
        const points = roundedRecyclableWaste * 5;
        const priceReduction = points * 0.1;

        setRedeemPoints(points);
        setRedeemPrice(priceReduction);

        const totalFoodWaste = activeRequests.reduce((sum, request) => sum + (request.foodWaste || 0), 0);
        const roundedFoodWaste = Math.round(totalFoodWaste);
        const fine = Math.floor(roundedFoodWaste / 2) * 10;

        setFineAmount(fine);

        const totalWeight = activeRequests.reduce((sum, request) => sum + (request.totalWeight || 0), 0);
        const roundedTotalWeight = Math.round(totalWeight);
        const basePrice = Math.floor(roundedTotalWeight / 5) * 20;

        setTotalWeightBill(basePrice);

        const area = activeRequests.length > 0 ? activeRequests[0].area : ''; // Assuming area is a direct field
        const charge = areaCharges[area] || 0;

        setExtraCharge(charge);
        setExtraChargeDescription(charge > 0 ? `Extra charge for Your Area:` : '');

        // Calculate total bill including the extra charge
        const calculatedTotalBill = basePrice + fine - priceReduction + charge;
        setTotalBill(calculatedTotalBill);
    }, [requests]);

    const handleUpdateClick = (requestId) => {
        const userId = localStorage.getItem('user_id');
        navigate(`/update-request/${userId}/${requestId}`);
    };

    const handleDelete = async (requestId) => {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            alert('User is not authenticated');
            return;
        }

        if (window.confirm('Are you sure you want to delete this request?')) {
            try {
                await axios.delete(`http://localhost:8080/api/garbage-requests/${requestId}/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                alert('Request deleted successfully!');
                setRequests(requests.filter(request => request.id !== requestId));
            } catch (error) {
                console.error('Error deleting request:', error);
                alert('Failed to delete request. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="garbageRequests__loading">
                <div className="garbageRequests__spinner"></div>
            </div>
        );
    }

    if (error) return <div className="garbageRequests__error">Error: {error}</div>;

    return (
        <div className="garbageRequests__container">

            <h2 className="garbageRequests__title">Your Garbage Requests</h2>
            {requests.length === 0 ? (
                <p className="garbageRequests__noRequests">You have not made any garbage requests yet.</p>
            ) : (
                <div className="garbageRequests__tableContainer">
                    <table className="garbageRequests__table">
                        <thead className="garbageRequests__tableHeader">
                        <tr>
                            <th>ID</th>
                            <th>Food Waste(Kg)</th>
                            <th>E-Waste(Kg)</th>
                            <th>Recyclable Waste(Kg)</th>
                            <th>Regular Waste(Kg)</th>
                            <th>Total Weight</th>
                            <th>Request Date</th>
                            <th>Address</th>
                            <th>Comments</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.foodWaste || 'N/A'}</td>
                                <td>{request.ewaste || 'N/A'}</td>
                                <td>{request.recyclableWaste || 'N/A'}</td>
                                <td>{request.regularWaste || 'N/A'}</td>
                                <td>{request.totalWeight || 'N/A'}</td>
                                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                                <td>{request.address}</td>
                                <td>{request.comments || 'No Comments'}</td>
                                <td>
                                    <span className={`garbageRequests__status ${request.completed ? 'garbageRequests__statusCompleted' : 'garbageRequests__statusPending'}`}>
                                        {request.completed ? 'Completed' : 'Pending'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateClick(request.id)}
                                        className="garbageRequests__updateButton"
                                        disabled={request.completed}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(request.id)}
                                        className="garbageRequests__deleteButton"
                                        disabled={request.completed}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}



            <div className="garbageRequests__billing">
                <h3 className="garbageRequests__billingTitle">Your Bill</h3>
                <div className="garbageRequests__billingCard">
                    <div className="garbageRequests__billingItem">
                        <span>Total Weight Bill:</span>
                        <span>Rs. {totalWeightBill}</span>
                    </div>


                    <div className="garbageRequests__billingItem">
                        <span>Redeem Points:</span> {/* Added Redeem Points */}
                        <span>{redeemPoints} </span>
                    </div>

                    <div className="garbageRequests__billingItem">
                        <span>Redeem Price:</span>
                        <span>Rs. {redeemPrice}</span>
                    </div>

                    <div className="garbageRequests__billingItem">
                        <span>Fine Amount:</span>
                        <span>Rs. {fineAmount}</span>
                    </div>
                    {extraCharge > 0 && (
                        <div className="garbageRequests__billingItem">
                            <span>{extraChargeDescription}</span>
                            <span>Rs. {extraCharge}</span>
                        </div>
                    )}
                    <hr />
                    <hr/>
                    <div className="garbageRequests__billingItem">
                        <span>Total Bill:</span>
                        <span>Rs. {totalBill}</span>
                    </div>
                </div>
                <p className="garbageRequests__payMessage">Please pay the bill when the garbage collection arrives.</p>

            </div>
        </div>
    );
};

export default ViewGarbageRequests;
