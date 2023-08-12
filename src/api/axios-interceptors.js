import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      document.location.href = "/login";
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default instance;
