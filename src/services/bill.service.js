import axios from "axios";

const user = JSON.parse(window.localStorage.getItem("user"));

const url = "http://localhost:3001/api/bills";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${user ? user.token : ""}`,
  },
};

export function getBills() {
  return axios.get(url, config)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}

export function getBill(id) {
  return axios.get(`${url}/${id}`, config)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}

export function createBill (bill) {
  return axios.post(url, bill, config)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}

export const updateBill = async (bill) => {
  try {
    const { data } = await axios.put(`${url}/${bill.idBill}`, bill, config);
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteBill = async (id) => {
  try {
    const { data } = await axios.delete(`${url}/${id}`, config);
    return data;
  } catch (error) {
    throw error;
  }
}