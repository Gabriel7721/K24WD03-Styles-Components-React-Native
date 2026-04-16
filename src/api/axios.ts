import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.160.130/api",
});

export default api;
