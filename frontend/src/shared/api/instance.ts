import axios from "axios";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default apiInstance;
