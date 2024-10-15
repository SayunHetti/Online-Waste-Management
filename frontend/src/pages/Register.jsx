import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../assets/CSS/RegisterForm.css';
const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // For navigation

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:8080/user/register', {
                firstname,
                lastname,
                email,
                password,
                age,
                address,
                gender
            });

            setSuccess('Registration successful!');
            setTimeout(() => {
                navigate('/'); // Redirect to login page
            }, 800);

        } catch (err) {
            setError(err.response ? err.response.data.message : 'Registration failed');
            alert(err.response ? err.response.data.message : 'Registration failed');
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-screen">
                <div className="form-section">
                    <h2 className="registration-header">Register</h2>
                    <form onSubmit={handleRegister} className="registration-form">
                        <div className="form-group firstname-group">
                            <label htmlFor="firstname">First Name:</label>
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="form-group lastname-group">
                            <label htmlFor="lastname">Last Name:</label>
                            <input
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                                placeholder="Enter your last name"
                            />
                        </div>
                        <div className="form-group email-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="form-group password-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Create a password"
                            />
                        </div>
                        <div className="form-group age-group">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                placeholder="Enter your age"
                            />
                        </div>
                        <div className="form-group address-group">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                placeholder="Enter your address"
                            />
                        </div>
                        <div className="form-group gender-group">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit" className="register-button">Register</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <div className="login-link-section">
                        <p>Already have an account? <a href="/" className="login-link">Login</a></p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Register;
