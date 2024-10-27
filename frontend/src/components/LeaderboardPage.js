// src/pages/LeaderboardPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-users`);
            setUsers(response.data); // assuming response data is sorted by points
        };
        fetchUsers();
    }, []);

    const handleShowHistory = async (userId) => {
        // Show modal with user's claimed points history
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/your-history`, { userId });
        console.log(response.data); // display in modal
    };

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => handleShowHistory(user.id)}>
                        {user.name} - {user.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardPage;
