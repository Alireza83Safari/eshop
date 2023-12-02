import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://eshop-bak.iran.liara.run/api/v1/admin/",
  withCredentials: true,
});
adminAxios.interceptors.request.use(
  function (config) {
    const cookieValue = document.cookie
      .split(";")
      .find((row) => row.startsWith("Authorization="))
      ?.split("=")[1];

    if (cookieValue) {
      config.headers.Authorization = `Bearer ${cookieValue}`;
    }
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
      document.location.href = "/login";
    }
    if (error.response.status === 403) {
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
