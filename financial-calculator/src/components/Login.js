import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve the user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Check if the entered email and password match the stored credentials
        if (user && user.email === email && user.password === password) {
            alert('Login successful!');
            onLogin();
            navigate('/');
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
