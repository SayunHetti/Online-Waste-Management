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
import {useNavigate} from "react-router-dom";
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
            setMessage('Waste entry saved successfully!');
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
            setMessage('User is not authenticated');
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/user/waste/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Waste entry deleted successfully');
            setTimeout(() => {
                window.location.reload(); // Reload the page after update
            }, 800);
        } catch (err) {
            setMessage('Error deleting waste entry');
        }
    };

    return (
        <div>
            <div>
                <h2 >Waste Data Dashboard</h2>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                {/* If no waste data, show form to add new waste entry */}
                {!wasteData ? (
                    <div className="overlay">
                        <h3 className="overlay-heading">Add Waste Data</h3>
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
                        <h2>Your Bin Status</h2>
                        {wasteData ? (
                            <div className="bin-status-container">
                                <div className="bins">
                                    <div className="bin">
                                        <img src={foodBin} alt="Food Waste Bin"/>
                                        <p>{wasteData.foodWaste} kg</p>
                                    </div>
                                    <div className="bin">
                                        <img src={eWasteBin} alt="E-Waste Bin"/>
                                        <p>{wasteData.ewaste} kg</p>
                                    </div>
                                    <div className="bin">
                                        <img src={recyclableBin} alt="Recyclable Waste Bin"/>
                                        <p>{wasteData.recyclableWaste} kg</p>
                                    </div>
                                    <div className="bin">
                                        <img src={regularBin} alt="Regular Waste Bin"/>
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
                        ) : (
                            <p>No waste data available</p>
                        )}

                        {/* Show edit and delete buttons */}
                        <button onClick={() => setIsEditing(true)}>Update Waste Entry</button>
                        <button onClick={handleDelete}>Delete Waste Entry</button>


                    </div>
                ) : (
                    <div>
                        {/* Update form */}
                        <h3>Update Waste Data</h3>
                        <form onSubmit={handleUpdate}>
                            <label>Food Waste: <input type="number" value={foodWaste}
                                                      onChange={(e) => setFoodWaste(e.target.value)}/></label>
                            <label>E-Waste: <input type="number" value={eWaste}
                                                   onChange={(e) => setEWaste(e.target.value)}/></label>
                            <label>Recyclable Waste: <input type="number" value={recyclableWaste}
                                                            onChange={(e) => setRecyclableWaste(e.target.value)}/></label>
                            <label>Regular Waste: <input type="number" value={regularWaste}
                                                         onChange={(e) => setRegularWaste(e.target.value)}/></label>
                            <button type="submit" disabled={isLoading}>Update Waste Entry</button>
                        </form>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Dashboard;
