import axios from "axios";

const instance = axios.create({
  baseURL: "/api/v1/user/",
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
    if (
      error.response.status === 401 &&
      error?.response?.request?.responseURL !==
        "http://localhost:3000/api/v1/user/is_authenticated"
    ) {
 
      document.location.href = "/login";
    }
    if (error.response.status === 403) {
      document.location.href = "";
    }
    return Promise.reject(error);
  }
);

export default instance;
