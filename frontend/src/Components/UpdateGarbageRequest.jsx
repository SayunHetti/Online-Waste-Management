import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/CSS/UpdateGarbageRequest.css';

const UpdateGarbageRequest = () => {
    const { userId, requestId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        area: '',
        requestDate: '',
        address: '',
        comments: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateError, setDateError] = useState(''); // State to store the date error message

    useEffect(() => {
        const fetchRequest = async () => {
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                alert('User is not authenticated');
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
                const request = response.data.find(req => req.id === parseInt(requestId));
                if (request) {
                    setFormData({
                        area: request.area,
                        requestDate: request.requestDate,
                        address: request.address,
                        comments: request.comments,
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching request:', err);
                setError('An error occurred while fetching the request.');
                setLoading(false);
            }
        };

        fetchRequest();
    }, [userId, requestId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear the date error when user changes the date field
        if (e.target.name === 'requestDate') {
            setDateError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!userId || !token) {
            alert('User is not authenticated');
            return;
        }

        // Validate that the request date is not in the past
        const selectedDate = new Date(formData.requestDate);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set the time to midnight to avoid issues with time comparison

        if (selectedDate < currentDate) {
            setDateError('Request date cannot be in the past.');
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/garbage-requests/${requestId}/${userId}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            alert('Request updated successfully!');
            navigate('/view-requests');
        } catch (error) {
            console.error('Error updating request:', error);
            let errorMessage = 'An error occurred while updating the request.';
            if (error.response) {
                errorMessage = `Error: ${error.response.status} - ${error.response.data}`;
            } else if (error.request) {
                errorMessage = 'No response from server. Please try again later.';
            } else {
                errorMessage = 'Error: ' + error.message;
            }
            alert(errorMessage);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="update-garbage-overlay">
            <h2 className="update-garbage-heading">Update Garbage Request</h2>
            <form onSubmit={handleSubmit}>
                <label className="update-garbage-label">
                    Area:
                    <select name="area" className="update-garbage-select" value={formData.area} onChange={handleChange}
                            required>
                        <option value="">Select District</option>
                        <option value="District 1">Colombo</option>
                        <option value="District 2">Gampaha</option>
                        <option value="District 3">Kaluthara</option>
                        <option value="District 4">Galle</option>
                        <option value="District 5">Mathara</option>
                        <option value="District 6">Hambanthota</option>
                        <option value="District 7">Negombo</option>
                        <option value="District 8">Kandy</option>
                        <option value="District 9">Rathnapura</option>
                        <option value="District 10">Badulla</option>
                        <option value="District 11">Jaffna</option>
                        <option value="District 12">Mulative</option>
                        <option value="District 13">chilaw</option>
                        <option value="District 14">Ampara</option>
                        <option value="District 15 ">Polonnaruwa</option>
                    </select>
                </label>
                <br/>
                <label className="update-garbage-label">
                    Request Date:
                    <input
                        type="date"
                        name="requestDate"
                        className="update-garbage-input"
                        value={formData.requestDate}
                        onChange={handleChange}
                        required
                    />
                    {dateError && <div className="update-garbage-error">{dateError}</div>}
                </label>
                <br/>
                <label className="update-garbage-label">
                    Address:
                    <input
                        type="text"
                        name="address"
                        className="update-garbage-input"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br/>
                <label className="update-garbage-label">
                    Comments:
                    <textarea
                        name="comments"
                        className="update-garbage-textarea"
                        value={formData.comments}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <br />
                <button type="submit" className="update-garbage-button">Save</button>
            </form>
        </div>
    );
};

export default UpdateGarbageRequest;
