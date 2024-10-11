import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FormSubmissionPage = () => {
    const { requestId } = useParams();
    const location = useLocation();
    const [file, setFile] = useState(null);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const params = new URLSearchParams(location.search);
    const routeString = params.get('route');

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFile(acceptedFiles[0]);
        }
    });

    const handleSubmit = async (e) => {
        if (!userId || !token) {
            setError('User is not authenticated');
            return;
        }
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('imageUrl', file);
        formData.append('collectedDateTime', new Date().toISOString());
        formData.append('rating', rating);

        try {
            await axios.post(`http://localhost:8080/api/waste-collection/submit/${requestId}?route=${encodeURIComponent(routeString)}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });

            await axios.put(
                `http://localhost:8080/api/requests/complete/${requestId}`,
                null,  // No body needed, so you can pass null
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Add the Authorization header
                    }
                }
            );
            navigate('/history');
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
                </form>
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '40px',
                maxWidth: '600px',
            }}>
                <p style={{
                    fontSize: '20px',
                    color: '#555',
                    fontStyle: 'italic',
                    marginBottom: '10px',
                }}>
                    “Act as if what you do makes a difference. It does.”
                </p>
                <p style={{
                    fontSize: '16px',
                    color: '#888',
                }}>
                    - William James
                </p>
            </div>
        </div>
    );
};

export default FormSubmissionPage;
