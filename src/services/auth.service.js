import axios from 'axios'

const url = "http://localhost:3001/api/auth/login";

export default function login (credentials) {
  return axios.post(url, credentials)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    })
}