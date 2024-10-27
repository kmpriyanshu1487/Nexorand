// src/components/UserModal.js
import React from 'react';

const UserModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{user.name}'s Point History</h2>
        <ul>
          {user.history.map((entry, index) => (
            <li key={index} className="border-b py-2">
              {entry.date}: {entry.points} points
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;
