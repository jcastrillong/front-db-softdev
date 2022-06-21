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

export function createProduct (product) {
  return axios.post(url, product, config)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}

export const updateProduct = async (product) => {
  try {
    const { data } = await axios.put(`${url}/${product.id_product}`, product, config);
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteProduct = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`, config);
    return data;
  } catch (error) {
    throw error;
  }
}