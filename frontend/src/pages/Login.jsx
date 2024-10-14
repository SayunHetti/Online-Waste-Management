import  { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import '../assets/CSS/LoginForm.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/user/authenticate', {
                email,
                password
            });
            // Store token, role, user_id in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('address', response.data.address);

            // Redirect or handle successful login
            setTimeout(() => {
                if (response.data.role === 'EMPLOYEE') {
                    navigate('/employeeLogin');
                }
                else if (response.data.role === 'ADMIN') {
                    navigate('/Admin-dashboard');
                }
                else {
                    navigate('/dashboard');
                }
            }, 800);
        } catch (err) {
            setError('Login failed, please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-screen">
                <h2 className="login-header">Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group email-group">
                        <label htmlFor="login-email">Email:</label>
                        <input
                            type="email"
                            id="login-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="login-password">Password:</label>
                        <input
                            type="password"
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="login-link-section">
                    <p>Got no account? <a href="/register" className="login-link">Register</a></p>
                </div>
            </div>

        </div>

    );
};

export default Login;
