import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserHistory } from '../api/api'; 

const Navbar = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const fetchUserHistory = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserHistory(username);
      setUserHistory(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch user history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      const username = 'exampleUsername'; // Replace with actual logic to get the logged-in user's username
      fetchUserHistory(username);
    }
  }, [isPopupVisible]);

  return (
    <nav className="bg-[#262626] p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-white text-xl">Nexorand</h1>
        <div className="flex space-x-6">
          <Link to="/home" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
          <button
            onClick={togglePopup}
            className="text-white hover:underline focus:outline-none"
          >
            Pop-up
          </button>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-2">User History</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul>
                {userHistory.map((entry, index) => (
                  <li key={index} className="mb-2">
                    Points Awarded: {entry.pointsAwarded}, Date: {entry.date}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={togglePopup}
              className="px-4 py-2 bg-[#262626] text-white rounded hover:bg-[#3a3a3a] focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
