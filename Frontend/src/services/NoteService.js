import axios from "axios";

// Remove '/notes' from base URL to match backend 
const REST_API_BASE_URL = 'http://localhost:8080';

export const listNotes = () => axios.get(`${REST_API_BASE_URL}/notes`); 

export const createNote = (note) => axios.post(`${REST_API_BASE_URL}/savenote`, note);

export const updateNote = (id, updatedNote) => {
    return axios.put(`${REST_API_BASE_URL}/update/${id}`, updatedNote); 
  }

  export const deleteNote = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/delete/${id}`);
  }

export const archiveNote = (id) => {
    return axios.put(`${REST_API_BASE_URL}/archive/${id}`);
}

export const unarchiveNote = (id) => {
    return axios.put(`${REST_API_BASE_URL}/unarchive/${id}`);
}

export const listActiveNotes = () => axios.get(`${REST_API_BASE_URL}/activeNotes`);

export const listArchivedNotes = () => axios.get(`${REST_API_BASE_URL}/archivedNotes`);
