import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeLogin = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading status
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const handleLogin = async () => {
        if (!userId || !token) {
            setError('User is not authenticated');
            return;
        }
        setLoading(true); // Set loading to true when form submission starts
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('http://localhost:8080/api/employeelog/verify', null, { params: { code }, headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data) {
                navigate('/requests');
            } else {
                setError('Not authorized');
            }
        } catch (err) {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Server error. Please try again later.';
            setError(errorMessage);
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false); // Set loading to false once submission is complete
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f9',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#333'
                }}>Welcome Back!</h1>
                <p style={{
                    fontSize: '18px',
                    color: '#666',
                    marginTop: '10px'
                }}>Your dedication keeps our communities clean and healthy.</p>
            </div>

            <div style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                width: '300px',
            }}>
                <h2 style={{
                    fontSize: '24px',
                    color: '#333',
                    marginBottom: '20px'
                }}>Employee Login</h2>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter verification code"
                    style={{
                        width: '100%',
                        padding: '10px',
                        margin: '10px 0',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        fontSize: '16px'
                    }}
                />
                <button
                    onClick={handleLogin}
                    disabled={loading || !code.trim()} // Disable button if loading or no code entered
                    style={{
                        backgroundColor: loading ? '#218838' : '#28a745',
                        color: '#fff',
                        padding: '12px',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        width: '100%',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {loading ? (
                        <>
                            <span style={{ marginRight: '8px' }}>Verifying</span>
                            <div
                                style={{
                                    border: '4px solid white',
                                    borderTop: '4px solid #ccc',
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '16px',
                                    animation: 'spin 1s linear infinite'
                                }}
                            ></div>
                        </>
                    ) : (
                        'Verify'
                    )}
                </button>
                {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '50px',
                maxWidth: '600px'
            }}>
                <p style={{
                    fontSize: '20px',
                    color: '#555',
                    fontStyle: 'italic',
                    marginBottom: '10px'
                }}>
                    Great things are not done by impulse, but by a series of small things brought together.
                </p>
                <p style={{
                    fontSize: '16px',
                    color: '#888'
                }}>- Vincent van Gogh</p>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default EmployeeLogin;
