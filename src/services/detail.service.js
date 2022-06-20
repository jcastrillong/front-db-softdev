import axios from "axios";

const user = JSON.parse(window.localStorage.getItem("user"));

const url = "http://localhost:3001/api/details";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${user ? user.token : ""}`,
  },
};

export const getDetails = () => {
  return axios.get(url)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}

export const createDetail = (detail) => {
  return axios.post(url, detail, config)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}