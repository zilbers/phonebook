import axios from 'axios';
const baseUrl = '/api/persons';

function getAll() {
  return axios.get(baseUrl);
}

function create(newObject) {
  return axios.post(baseUrl, newObject);
}

function update(id, newObject) {
  return axios.put(`${baseUrl}/${id}`, newObject);
}

function deleteById(id) {
  return axios.delete(`/api/persons/${id}`);
}

export { getAll, create, update, deleteById };
