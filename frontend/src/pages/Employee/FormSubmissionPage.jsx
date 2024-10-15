import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import '../../assets/CSS/FormSubmissionPage.css'; // Import the stylesheet

const FormSubmissionPage = () => {
    const { requestId } = useParams();
    const location = useLocation();
    const [file, setFile] = useState(null);
    const [fileBase64, setFileBase64] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const params = new URLSearchParams(location.search);
    const routeString = params.get('route');

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const file = acceptedFiles[0];
            setFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFileBase64(reader.result);
            };
        }
    });

    const handleSubmit = async (e) => {
        if (!userId || !token) {
            setError('User is not authenticated');
            return;
        }
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const requestPayload = {
            imageUrl: fileBase64,
            collectedDateTime: new Date().toISOString(),
            rating: rating
        };

        try {
            await axios.post(`http://localhost:8080/api/waste-collection/submit/${requestId}?route=${encodeURIComponent(routeString)}`, requestPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            await axios.put(
                `http://localhost:8080/api/requests/complete/${requestId}`,
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            const response = await axios.get(`http://localhost:8080/api/requests/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const entry = response.data;
            const userId = parseInt(entry.userId, 10);

            await axios.delete(`http://localhost:8080/user/waste/delete/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setSuccessMessage('Waste has been collected successfully, and the user data has been removed.');
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Server error. Please try again later.';
            setError(errorMessage);
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-submission-container">
            <div className="form-submission-header">
                <h1 className="form-submission-title">Route Completion Form</h1>
                <p className="form-submission-subtitle">Please upload a proof image and rate the route</p>
            </div>

            <div className="form-submission-card">
                <div className="form-submission-route">
                    <strong>Route:</strong> {routeString}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div {...getRootProps()} className={`form-submission-dropzone ${file ? 'active' : 'dashed'}`}>
                        <input {...getInputProps()} />
                        {file ? (
                            <p>Selected file: {file.name}</p>
                        ) : (
                            <p>Drag & drop an image, or click to select a file</p>
                        )}
                    </div>

                    <label className="form-submission-label">
                        Route Rating:
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                            className="form-submission-input"
                        />
                    </label>

                    <button
                        type="submit"
                        className="form-submission-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="form-submission-loading" />
                        ) : (
                            'Submit'
                        )}
                    </button>

                    {error && <p className="form-submission-error">{error}</p>}
                    {successMessage && <p className="form-submission-success">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default FormSubmissionPage;
