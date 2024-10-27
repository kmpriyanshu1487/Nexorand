import React from 'react';

const UserModal = ({ user, onClose }) => {
    return (
        <div className="modal">
            <h3>{user.username}'s Claim History</h3>
            <ul>
                {user.history.map((entry, index) => (
                    <li key={index}>{entry.pointsAwarded} points claimed on {entry.date}</li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default UserModal;
