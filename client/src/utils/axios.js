import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    'Authorization': localStorage.getItem("Token") ?? ""
  }
});

instance.interceptors.response.use(
  res => res,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("Token");
    };
    return Promise.reject(error);
  }
);

export default instance;