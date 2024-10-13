import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/CSS/DashboardCSS.css';
import '../assets/CSS/AddNewWasteEntryData.css';
import foodBin from '../assets/images/FoodBin.png';
import eWasteBin from '../assets/images/InOrganicBin.png';
import recyclableBin from '../assets/images/RecyclableBin.png';
import regularBin from '../assets/images/OrganicBin.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Link, useNavigate} from "react-router-dom";
const Dashboard = () => {
    const [wasteData, setWasteData] = useState(null);
    const [totalWeight, setTotalWeight] = useState('');
    const [foodWaste, setFoodWaste] = useState('');
    const [eWaste, setEWaste] = useState('');
    const [recyclableWaste, setRecyclableWaste] = useState('');
    const [regularWaste, setRegularWaste] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);  // Track if user is editing
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    // Fetch waste data on component mount
    useEffect(() => {
        const fetchWasteData = async () => {
            if (!userId || !token) {
                setMessage('User is not authenticated');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/user/waste/getWasteData/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data) {
                    setWasteData(response.data);
                    setTotalWeight(response.data.totalWeight);
                    setFoodWaste(response.data.foodWaste);
                    setEWaste(response.data.ewaste);
                    setRecyclableWaste(response.data.recyclableWaste);
                    setRegularWaste(response.data.regularWaste);
                }
            } catch (err) {
                navigate('/login');
                alert('Session Expired Please Re-login');
              
            }
        };

        fetchWasteData().then();
    }, [userId, token, navigate]);

    // Handle save (for new entries)
    const handleSave = async () => {
        setError('');
        setIsLoading(true);

        if (!userId || !token) {
            setIsLoading(false);
            setError('User is not authenticated');
            return;
        }

        const wasteData = {
            userId: parseInt(userId),
            totalWeight,
            foodWaste,
            eWaste,
            recyclableWaste,
            regularWaste,
        };

        try {
            await axios.post('http://localhost:8080/user/waste/save', wasteData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsLoading(false);
            alert('Waste entry saved successfully!');
            setTimeout(() => {
                window.location.reload(); // Reload the page after save
            }, 2000);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    // Handle update (for existing entries)
    const handleUpdate = async () => {

        setError('');
        setIsLoading(true);

        if (!userId || !token) {
            setIsLoading(false);
            setError('User is not authenticated');
            return;
        }

        const wasteData = {
            userId: parseInt(userId),
            totalWeight,
            foodWaste,
            eWaste,
            recyclableWaste,
            regularWaste,
        };

        try {
            await axios.put(`http://localhost:8080/user/waste/update/${userId}`, wasteData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsLoading(false);
            setMessage('Waste entry updated successfully!');
            setTimeout(() => {
                window.location.reload(); // Reload the page after update
            }, 2000);
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    // Handle delete
    const handleDelete = async () => {
        if (!userId || !token) {
            alert('User is not authenticated');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/user/waste/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Waste entry deleted successfully');
            setTimeout(() => {
                window.location.reload(); // Reload the page after update
            }, 800);
        } catch (err) {
            alert('Error deleting waste entry');
        }
    };

    return (
        <div>
            <div>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
                {/* If no waste data, show form to add new waste entry */}
                {!wasteData ? (
                    <div className="overlay">
                        <h3 className="overlay-heading"> Lets Add Waste Data</h3>
                        <form onSubmit={handleSave}>
                            <label className="overlay-label">
                                Total Weight:
                                {totalWeight === '' &&
                                    <span className="error-message">*</span>}
                                <input
                                    type="number"
                                    value={totalWeight}
                                    onChange={(e) => setTotalWeight(e.target.value)}
                                    className="overlay-input"
                                    required
                                />

                            </label>
                            <label className="overlay-label">
                                Food Waste:
                                {foodWaste === '' &&
                                    <span className="error-message">*</span>}
                                <input
                                    type="number"
                                    value={foodWaste}
                                    onChange={(e) => setFoodWaste(e.target.value)}
                                    className="overlay-input"
                                    required
                                />

                            </label>
                            <label className="overlay-label">
                                E-Waste:
                                {eWaste === '' &&
                                    <span className="error-message">*</span>}
                                <input
                                    type="number"
                                    value={eWaste}
                                    onChange={(e) => setEWaste(e.target.value)}
                                    className="overlay-input"
                                    required
                                />

                            </label>
                            <label className="overlay-label">
                                Recyclable Waste:
                                {recyclableWaste === '' &&
                                    <span className="error-message">*</span>}
                                <input
                                    type="number"
                                    value={recyclableWaste}
                                    onChange={(e) => setRecyclableWaste(e.target.value)}
                                    className="overlay-input"
                                    required
                                />

                            </label>
                            <label className="overlay-label">
                                Regular Waste:
                                {regularWaste === '' &&
                                    <span className="error-message">*</span>}
                                <input
                                    type="number"
                                    value={regularWaste}
                                    onChange={(e) => setRegularWaste(e.target.value)}
                                    className="overlay-input"
                                    required
                                />

                            </label>
                            <button type="submit" className="overlay-button" disabled={isLoading}>
                                Save Waste Entry
                            </button>
                        </form>
                    </div>


                ) : !isEditing ? (
                    <div>

                        {wasteData ? (
                            <div className="flex_BigContainer_rewardRedeemContainer">
                            <div className="bin-status-container">
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        {/*<i*/}
                                        {/*    className="fas fa-trash"*/}
                                        {/*    style={{color: 'red', cursor: 'pointer'}}*/}
                                        {/*    onClick={handleDelete}>*/}
                                        {/*</i>*/}
                                    </div>
                                    <h2 className="bin-status-heading">Your Bin Status</h2>
                                    <div>
                                        <i
                                            className="fas fa-pencil-alt"
                                            style={{color: 'black', marginRight: '10px', cursor: 'pointer'}}
                                            onClick={() => setIsEditing(true)}>
                                        </i>
                                    </div>
                                </div>

                                <div className="bins">
                                    <div className="bin">
                                        <img src={foodBin} alt="Food Waste Bin"/>
                                        <p>Disposable Waste</p>
                                        <p>{wasteData.foodWaste} kg</p>
                                    </div>
                                    <div className="bin">
                                        <img src={eWasteBin} alt="E-Waste Bin"/>
                                        <p>Electrical Waste</p>
                                        <p>{wasteData.ewaste} kg</p>
                                    </div>
                                    <div className="bin">
                                        <img src={recyclableBin} alt="Recyclable Waste Bin"/>
                                        <p>Recycling waste</p>
                                        <p>{wasteData.recyclableWaste} kg</p>

                                    </div>
                                    <div className="bin">
                                        <div>
                                            <img src={regularBin} alt="Regular Waste Bin"/>
                                            <p>Domestic Waste</p>
                                        </div>
                                        <p>{wasteData.regularWaste} kg</p>
                                    </div>
                                </div>
                                <div className="circular-progress">
                                    <div className="progress-item">
                                        <CircularProgressbar value={wasteData.foodWaste} maxValue={100}
                                                             text={`${wasteData.foodWaste}%`}/>
                                        <p>Food</p>
                                    </div>
                                    <div className="progress-item">
                                        <CircularProgressbar value={wasteData.recyclableWaste} maxValue={100}
                                                             text={`${wasteData.recyclableWaste}%`}/>
                                        <p>Recyclable</p>
                                    </div>
                                    <div className="progress-item">
                                        <CircularProgressbar value={wasteData.ewaste} maxValue={100}
                                                             text={`${wasteData.ewaste}%`}/>
                                        <p>E-Waste</p>
                                    </div>
                                    <div className="progress-item">
                                        <CircularProgressbar value={wasteData.regularWaste} maxValue={100}
                                                             text={`${wasteData.regularWaste}%`}/>
                                        <p>Regular</p>
                                    </div>
                                </div>
                            </div>
                                <div>
                                    <div className="rewardRedeemContainer">
                                        <h2 className="rewardHeader">Payments</h2>
                                        <div className="rewardContent">
                                            <div className="leftContent">
                                                <img
                                                    src="http://getdrawings.com/free-icon-bw/reward-points-icon-20.png" // Replace with your icon URL
                                                    alt="Icon"
                                                    className="rewardIcon"
                                                />
                                                <span
                                                    className="rewardValue">{wasteData.recyclableWaste * 10} points</span>
                                            </div>
                                            <Link to="/payment" className="redeemButton">View</Link>
                                        </div>
                                        <div className="rewardContent">
                                            <div className="leftContent">
                                                <img
                                                    src="https://cdn2.iconfinder.com/data/icons/business-03-solid/64/Bill-document-file-finance-money-page-1024.png" // Replace with your icon URL
                                                    alt="Icon"
                                                    className="rewardIcon"
                                                />
                                                <span className="rewardValue">LKR {wasteData.foodWaste * 10}</span>
                                            </div>
                                            <Link to="/payment" className="redeemButton">Pay</Link>
                                        </div>
                                    </div>
                                    <div className="rewardRedeemContainer">
                                        <h2 className="rewardHeader">History Table</h2>
                                        <div className="rewardContent">
                                            <div className="leftContent">
                                                <img
                                                    src="http://getdrawings.com/free-icon-bw/reward-points-icon-20.png" // Replace with your icon URL
                                                    alt="Icon"
                                                    className="rewardIcon"
                                                />
                                                <span
                                                    className="rewardValue">{wasteData.recyclableWaste * 50} points</span>
                                            </div>
                                            <Link to="/payment" className="redeemButton">View</Link>
                                        </div>
                                        <div className="rewardContent">
                                            <div className="leftContent">
                                                <img
                                                    src="https://cdn2.iconfinder.com/data/icons/business-03-solid/64/Bill-document-file-finance-money-page-1024.png" // Replace with your icon URL
                                                    alt="Icon"
                                                    className="rewardIcon"
                                                />
                                                <span className="rewardValue">LKR {wasteData.foodWaste * 10}</span>
                                            </div>
                                            <Link to="/payment" className="redeemButton">Pay</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No waste data available</p>
                        )}

                        {/* Show edit and delete buttons */}


                    </div>
                ) : (
                    <div className="update-waste-container">
                        <h3 className="update-heading">Update Waste Data</h3>
                        <form onSubmit={handleUpdate}>
                            <label className="update-label">
                                Food Waste:
                                <input
                                    type="number"
                                    value={foodWaste}
                                    onChange={(e) => setFoodWaste(e.target.value)}
                                    className="update-input"
                                />
                            </label>
                            <label className="update-label">
                                E-Waste:
                                <input
                                    type="number"
                                    value={eWaste}
                                    onChange={(e) => setEWaste(e.target.value)}
                                    className="update-input"
                                />
                            </label>
                            <label className="update-label">
                                Recyclable Waste:
                                <input
                                    type="number"
                                    value={recyclableWaste}
                                    onChange={(e) => setRecyclableWaste(e.target.value)}
                                    className="update-input"
                                />
                            </label>
                            <label className="update-label">
                                Regular Waste:
                                <input
                                    type="number"
                                    value={regularWaste}
                                    onChange={(e) => setRegularWaste(e.target.value)}
                                    className="update-input"
                                />
                            </label>
                            <button type="submit" className="update-button" disabled={isLoading}>
                                Update Waste Entry
                            </button>
                        </form>
                    </div>

                )}
            </div>
        </div>

    );
};

export default Dashboard;

