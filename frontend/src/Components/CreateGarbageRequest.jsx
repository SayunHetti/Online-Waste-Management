import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/CSS/CreateGarbageRequest.css';

const CreateGarbageRequest = () => {
    const [formData, setFormData] = useState({
        area: '',
        requestDate: '',
        address: '',
        comments: '',
        vehicleType:'',
    });

    const [errors, setErrors] = useState({
        area: '',
        requestDate: '',
        address: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        if (!userId || !token) {
            alert('User is not authenticated');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        if (!userId || !token) {
            alert('User is not authenticated');
            return;
        }

        // Validation logic
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        let isValid = true;

        // Reset errors
        const newErrors = {
            area: '',
            requestDate: '',
            address: '',
        };

        // Check for required fields
        if (!formData.area) {
            newErrors.area = 'Area is required.';
            isValid = false;
        }

        if (!formData.requestDate) {
            newErrors.requestDate = 'Request date is required.';
            isValid = false;
        } else if (formData.requestDate < today) {
            newErrors.requestDate = 'Request date cannot be in the past.';
            isValid = false;
        }

        if (!formData.address) {
            newErrors.address = 'Address is required.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return; // Exit if form is invalid

        const requestData = {
            area: formData.area,
            requestDate: formData.requestDate,
            address: formData.address,
            comments: formData.comments,
            vehicleType:formData.vehicleType
        };

        try {
            await axios.post(
                `http://localhost:8080/api/garbage-requests/${userId}`,
                requestData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            alert('Request created successfully!');
            setFormData({ area: '', requestDate: '', address: '', comments: '' });
            navigate('/view-requests'); // Navigate back to the /view-requests page
        } catch (error) {
            console.error('Error creating request:', error);
            let errorMessage = 'An error occurred while creating the request.';
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

    return (
        <div className="create-garbage-overlay">
            <h2 className="create-garbage-heading">Create Garbage Request</h2>
            <form onSubmit={handleSubmit}>
                <label className="create-garbage-label">
                    Area:
                    <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className="create-garbage-select"
                    >
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
                    {errors.area && <span className="create-garbage-error">{errors.area}</span>}
                </label>
                <label className="create-garbage-label">
                    VehicleType:
                    <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                        className="create-garbage-select"
                    >
                        <option value="">Select Request Type</option>
                        <option value="vehicleType">Truck</option>
                        <option value="vehicleType">Regular</option>

                    </select>
                    {errors.area && <span className="create-garbage-error">{errors.area}</span>}
                </label>
                <label className="create-garbage-label">
                    Request Date:
                    <input
                        type="date"
                        name="requestDate"
                        value={formData.requestDate}
                        onChange={handleChange}
                        required
                        className="create-garbage-input"
                    />
                    {errors.requestDate && <span className="create-garbage-error">{errors.requestDate}</span>}
                </label>
                <label className="create-garbage-label">
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="create-garbage-input"
                    />
                    {errors.address && <span className="create-garbage-error">{errors.address}</span>}
                </label>
                <label className="create-garbage-label">
                    Comments:
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        className="create-garbage-textarea"
                    ></textarea>
                </label>
                <button type="submit" className="create-garbage-button">
                    Create Request
                </button>
            </form>
        </div>
    );
};

export default CreateGarbageRequest;
