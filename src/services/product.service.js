import axios from 'axios';

const url = `http://localhost:3001/api/products`;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getProducts = () => {
  return axios.get(url, config)
}

export const getProduct = (id) => {
  return axios.get(`${url}/${id}`, config)
}