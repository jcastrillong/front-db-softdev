import axios from 'axios';

const url = `http://localhost:3001/api/products`;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// const getProduct = (id) => {
//   fetch(`http://localhost:3001/api/products/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     }
//     ).catch((err) => {
//       console.log("err", err);
//     }
//     );
// }

// const handleProducts = () => {
//   fetch("http://localhost:3001/api/products", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       setProducts(data);
//     }
//     ).catch((err) => {
//       console.log("err", err);
//     }
//     );
// }

export const getProducts = () => {
  return axios.get(url, config)
}

export const getProduct = (id) => {
  return axios.get(`${url}/${id}`, config)
}