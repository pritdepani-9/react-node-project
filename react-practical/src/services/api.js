import axios from 'axios';

const API_URL = 'http://localhost:5000';


export const signUpUser = async (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const verifyUserOtp = async (userData) => {
    return axios.post(`${API_URL}/auth/verify-email`, userData);
};

export const login = async (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};

export const createBooking = async (userData) => {
    return axios.post(`${API_URL}/booking/create-booking`, userData);
};