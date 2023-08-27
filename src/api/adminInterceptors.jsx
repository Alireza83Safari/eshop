import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:3000/api/v1/admin/",
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

adminAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      document.location.href = "/adminlogin";
      localStorage.removeItem("admin");
    }
    if (error.response.status === 403) {
      document.location.href = "/adminlogin";
      localStorage.removeItem("admin");
    }
    return Promise.reject(error);
  }
);

export default adminAxios;
