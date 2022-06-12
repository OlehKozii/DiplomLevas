import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    'Authorization': localStorage.getItem("Token") ?? ""
  }
});

export default instance;