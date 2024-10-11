import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FormSubmissionPage = () => {
    const { requestId } = useParams();
    const location = useLocation();
    const [file, setFile] = useState(null);
    const [fileBase64, setFileBase64] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // Success message state
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

            // Fetch the latest waste collection entry
            const response = await axios.get(`http://localhost:8080/api/requests/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const entry = response.data;
            const userId = parseInt(entry.userId, 10);

            // Delete the user based on the latest entry's userId
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f4f4f9',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#333'
                }}>Route Completion Form</h1>
                <p style={{
                    fontSize: '18px',
                    color: '#555'
                }}>Please upload a proof image and rate the route</p>
            </div>

            <div style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                width: '400px',
                textAlign: 'center',
            }}>
                <div style={{
                    marginBottom: '20px',
                    fontSize: '18px',
                    color: '#333'
                }}>
                    <strong>Route:</strong> {routeString}
                </div>

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div {...getRootProps()} style={file ? {
                        border: '2px solid #28a745',
                        padding: '20px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        width: '100%',
                        color: '#28a745',
                        textAlign: 'center',
                        backgroundColor: '#e6ffe6',
                    } : {
                        border: '2px dashed #ccc',
                        padding: '20px',
                        marginBottom: '20px',
                        cursor: 'pointer',
                        width: '100%',
                        color: '#888',
                        textAlign: 'center',
                    }}>
                        <input {...getInputProps()} />
                        {file ? (
                            <p>Selected file: {file.name}</p>
                        ) : (
                            <p>Drag & drop an image, or click to select a file</p>
                        )}
                    </div>

                    <label style={{
                        fontSize: '16px',
                        margin: '10px 0',
                        color: '#333'
                    }}>
                        Route Rating:
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                            style={{
                                marginLeft: '10px',
                                padding: '5px',
                                fontSize: '16px',
                                width: '60px'
                            }}
                        />
                    </label>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#28a745',
                            color: '#fff',
                            padding: '12px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div style={{
                                width: '20px',
                                height: '20px',
                                border: '3px solid #f3f3f3',
                                borderTop: '3px solid #28a745',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        ) : (
                            'Submit'
                        )}
                    </button>

                    {error && <p style={{
                        color: 'red',
                        marginTop: '20px',
                    }}>{error}</p>}

                    {successMessage && <p style={{
                        color: 'green',
                        marginTop: '20px',
                    }}>{successMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default FormSubmissionPage;
