// import axios from 'axios';

// export const API_URL = "http://localhost:4000";
// export const DEPLOYED_URL = "https://Shopsphereai backend.onrender.com"
// // change api

// export const api = axios.create({
//   baseURL: API_URL, 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

















import axios from 'axios';

const LOCAL_API_URL = "http://localhost:4000"; // local dev
const PROD_API_URL = import.meta.env.VITE_BASE_URL; // production

const API_BASE_URL = import.meta.env.DEV ? LOCAL_API_URL : PROD_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

