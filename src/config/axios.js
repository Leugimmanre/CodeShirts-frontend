import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://codeshirts-backend.onrender.com'
    // baseURL: 'http://localhost:4000'
});

export default axiosClient;