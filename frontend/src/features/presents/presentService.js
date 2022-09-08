import axios from 'axios';

const API_URL = '/api/presents/';

// Create new Present
const createPresent = async (presentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.post(API_URL, presentData, config);

  return response.data;
};

// Get user presents
const getPresents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user getPresent
const getPresent = async (presentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.get(API_URL + presentId, config);

  return response.data;
};

// Close present
const closePresent = async (presentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.put(API_URL + presentId, { status: 'closed' }, config);

  return response.data;
};

const presentService = {
  createPresent,
  getPresents,
  getPresent,
  closePresent
};

export default presentService;