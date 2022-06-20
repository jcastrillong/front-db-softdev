import axios from "axios";

const url = "http://localhost:3001/api/clients";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
  },
};

export function getClients() {
  return axios.get(url)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}

export function getClient(id) {
  return axios.get(`${url}/${id}`)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}

export function createClient(client) {
  return axios.post(url, client, config)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}

export function updateClient(client) {
  return axios.put(`${url}/${client.idClient}`, client, config)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}

export function deleteClient(id) {
  return axios.delete(`${url}/${id}`, config)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    })
}