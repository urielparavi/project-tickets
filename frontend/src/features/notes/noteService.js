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

// Create present note
const createNote = async (noteText, presentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  const response = await axios.post(API_URL + presentId + '/notes', {
    text: noteText,
  }, config);

  return response.data;
};

const noteService = {
  getNotes,
  createNote
};

export default noteService;