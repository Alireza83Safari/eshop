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
    //console.log(response);
    return response;
  },
  function (error) {
    //console.log("response", error.request.responseURL);
    if (error.response.status === 401) {
      document.location.href = "/login";
      localStorage.removeItem("user");
    }
    if (error.response.status === 403) {
      document.location.href = "";
    }
    return Promise.reject(error);
  }
);

export default instance;
