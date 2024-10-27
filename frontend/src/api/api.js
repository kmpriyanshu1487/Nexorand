import axios from 'axios';

const API_URL = 'http://localhost:7000/api/user/v1';

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/get-users`);
    return response.data.data;
};

export const claimPoints = async (username) => {
    const response = await axios.patch(`${API_URL}/claim-points`, { username });
    return response.data;
};

export const getUserHistory = async (username) => {
    const response = await axios.post(`${API_URL}/your-history`, { username });
    return response.data;
};

export const getUserInfo = async (userId) => {
    const response = await axios.post(`${API_URL}/get-users-info`, { userId });
    return response.data;
};
