import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/CSS/Profile.css'; // Make sure to import your CSS file

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        first_name: '',
        last_name: '',
        age: '',
        address: '',
        gender: ''
    });
    const [error, setError] = useState('');
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [validationMessages, setValidationMessages] = useState({
        age: ''
    });

    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    // Fetch profile data
    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfileData(response.data);
            setUpdatedData({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                age: response.data.age,
                address: response.data.address,
                gender: response.data.gender,
            });
        } catch (error) {
            setError('Failed to fetch profile data');
            console.error(error);
        }
    };

    // Handle profile update
    const handleUpdate = async () => {
        if (validateInputs()) {
            try {
                const response = await axios.put('http://localhost:8080/profile', updatedData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(response.data);
                setUnsavedChanges(false);
                setValidationMessages({ age: '' }); // Clear validation messages
                alert('Profile updated successfully');
            } catch (error) {
                setError('Failed to update profile');
                console.error(error);
            }
        }
    };

    // Validate input fields
    const validateInputs = () => {
        let valid = true;
        const newValidationMessages = { age: '' };

        if (updatedData.age < 0 || updatedData.age > 100) {
            newValidationMessages.age = 'Hmm! you sure this is correct.Age must be between 0 and 100.';
            valid = false;
        }

        setValidationMessages(newValidationMessages);
        return valid;
    };

    // Handle profile deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            try {
                await axios.delete('http://localhost:8080/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('Profile deleted successfully');
                localStorage.removeItem('token');
                window.location.href = '/login'; // Redirect to login after deletion
            } catch (error) {
                setError('Failed to delete profile');
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <h1 className="my-profile-header">My Profile</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {unsavedChanges && (
                <p className="unsaved-warning">Unsaved changes are here</p>
            )}

            {profileData ? (
                <div className="profile-content">
                    <p>
                        <strong>Email:</strong> {profileData.email}
                    </p>

                    <label>
                        First Name:
                        <input
                            type="text"
                            value={updatedData.first_name}
                            onChange={(e) => {
                                setUpdatedData({ ...updatedData, first_name: e.target.value });
                                setUnsavedChanges(true);
                            }}
                        />
                    </label>

                    <br />

                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={updatedData.last_name}
                            onChange={(e) => {
                                setUpdatedData({ ...updatedData, last_name: e.target.value });
                                setUnsavedChanges(true);
                            }}
                        />
                    </label>

                    <br />

                    <label>
                        Age:
                        <input
                            type="number"
                            value={updatedData.age}
                            onChange={(e) => {
                                setUpdatedData({ ...updatedData, age: e.target.value });
                                setUnsavedChanges(true);
                                setValidationMessages({ ...validationMessages, age: '' }); // Clear age error
                            }}
                        />
                        {validationMessages.age && (
                            <p style={{ color: 'red' }}>{validationMessages.age}</p>
                        )}
                    </label>

                    <br />

                    <label>
                        Address:
                        <input
                            type="text"
                            value={updatedData.address}
                            onChange={(e) => {
                                setUpdatedData({ ...updatedData, address: e.target.value });
                                setUnsavedChanges(true);
                            }}
                        />
                    </label>

                    <br />

                    <label>
                        Gender:
                        <select
                            value={updatedData.gender}
                            onChange={(e) => {
                                setUpdatedData({ ...updatedData, gender: e.target.value });
                                setUnsavedChanges(true);
                            }}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <div className="flex-content-update-delete">
                        <div className="update-delete-button-container">
                            <button onClick={handleUpdate}>Update Profile</button>
                            <button onClick={handleDelete} style={{color: 'red'}}>Delete Profile</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    );
};

export default Profile;
