import axios from "axios";

const adminAxios = axios.create({
  baseURL: "/api/v1/admin/",
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
      document.location.href = "/panel/login";
    }
    if (error.response.status === 403) {
      document.location.href = "/panel";
    }
    return Promise.reject(error);
  }
);

export default adminAxios;
