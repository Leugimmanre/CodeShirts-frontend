import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://localhost:4000'
});

export default axiosClient;