import axios from "axios";

const API = axios.create({
  baseURL:
    "https://gigflow-smart-dashboard-1.onrender.com/api",
});

export default API;