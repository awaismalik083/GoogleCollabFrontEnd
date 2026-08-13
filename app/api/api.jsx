import axios from "axios";

const api = axios.create({
  baseURL: "https://google-collab.vercel.app",
  withCredentials: true,
});

export default api;