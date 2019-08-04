import axios from 'axios';

const instance = axios.create({
    baseURL: "https://localhost:44395/",
    responseType: "json"
});

export default instance;