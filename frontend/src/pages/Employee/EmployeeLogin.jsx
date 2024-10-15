import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/CSS/EmployeeLogin.css'; // Import the CSS file

const EmployeeLogin = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const handleLogin = async () => {
        if (!userId || !token) {
            setError('User is not authenticated');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/employeelog/verify', null, {
                params: { code },
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data) {
                navigate('/requests');
            } else {
                setError('Not authorized');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Server error. Please try again later.';
            setError(errorMessage);
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="employee-login-body">
            <div className="employee-login-container">
                <div className="employee-login-header">
                    <h1>Welcome Back!</h1>
                    <p>Your dedication keeps our communities clean and healthy.</p>
                </div>

                <div className="employee-login-form">
                    <h2>Employee Login</h2>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter verification code"
                        className="employee-login-input"
                    />
                    <button
                        onClick={handleLogin}
                        disabled={loading || !code.trim()}
                        className="employee-login-button"
                    >
                        {loading ? (
                            <span className="loader">
                                <span>Verifying</span>
                            </span>
                        ) : (
                            'Verify'
                        )}
                    </button>
                    {error && <p className="employee-login-error">{error}</p>}
                </div>

                <div className="employee-login-quote">
                    <p>
                        Great things are not done by impulse, but by a series of small things brought together.
                    </p>
                    <p>- Vincent van Gogh</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeLogin;
