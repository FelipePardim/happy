import axios from 'axios';

require('dotenv');

const ApiURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: `${ApiURL}`
})

export default api;