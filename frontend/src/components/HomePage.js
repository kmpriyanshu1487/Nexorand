// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
const HomePage = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-users`);
            setFriends(response.data);
        };
        fetchFriends();
    }, []);

    const handleClaimPoints = async (friendId) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/claim-points`, { userId: friendId });

        } catch (error) {
            console.error('Error claiming points:', error);
        }
    };

    return (<>
      <Navbar/>
        <div>
            <h1>Your Friends</h1>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id} onClick={() => handleClaimPoints(friend.id)}>
                        {friend.name} - {friend.points} points
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default HomePage;
