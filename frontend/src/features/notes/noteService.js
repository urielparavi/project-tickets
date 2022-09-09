import axios from 'axios';

const API_URL = '/api/presents/';

// Get present notes
const getNotes = async (presentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.get(API_URL + presentId + '/notes', config);

  return response.data;
};

const noteService = {
  getNotes,
};

export default noteService;