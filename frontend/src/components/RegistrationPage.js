// src/pages/RegistrationPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                firstName,
                email,
                password,
            });
            login(response.data); // assuming the API returns user data
            navigate('/home'); // redirect to home page after registration
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationPage;
