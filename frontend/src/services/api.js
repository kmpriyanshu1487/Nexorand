// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/api/user/v1',
});

export const getUsers = () => API.get('/get-users');
export const claimPoints = (userId) => API.patch(`/claim-points/${userId}`);
export const getUserHistory = (userId) => API.post('/your-history', { userId });
export const getUserInfoById = (userId) => API.get(`/get-users-info-id/${userId}`);
