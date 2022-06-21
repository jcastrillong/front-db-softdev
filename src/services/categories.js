import axios from 'axios';

const user = JSON.parse(window.localStorage.getItem("user"));

const url = `http://localhost:3001/api/categories`;
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user ? user.token : ""}`,
  },
};

export const getCategoryById = async (id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`, config);
    return data;
  } catch (error) {
    throw error;
  }
}

export const getCategories = () => {
  return axios.get(url, config)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}

export function createCategory (category) {
    return axios.post(url, category, config)
      .then(res => {
        return res.data;
      }).catch(err => {
        throw err;
      })
  }
  
  export const updateCategory = async (category) => {
    try {
      const { data } = await axios.put(`${url}/${category.id_category}`, category, config);
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  export const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`${url}/${id}`, config);
      return data;
    } catch (error) {
      throw error;
    }
  }
