import axios from 'axios'

const url = "http://localhost:3001/api/auth/login";

const login = async (credentials) => {
  try {
    const { data } = await axios.post(url, credentials); 
    return data;
  } catch (error) { 
    throw error;
  }
}

// const login = async (credentials) => {
//   fetch(
//     url,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: credentials,
//     }
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("data", data);
//       return data;
//     }
//     ).catch((err) => {
//       console.log("err", err);
//     }
//     );
// }

  // async login(username, password) {
  //   return await axios.post(
  //     url,
  //     { username, password }
  //   );
  // }

  // async logout(token) {
  //   return await axios.post(
  //     url,
  //     { token }
  //   );
  // }

export default { login };