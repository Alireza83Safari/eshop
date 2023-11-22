import axios from "axios";
import toast from "react-hot-toast";

const userAxios = axios.create({
  baseURL: "/api/v1/user/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

userAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

userAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      error?.response?.request?.responseURL !==
        "https://eshop-bak.iran.liara.run/api/v1/user/is_authenticated"
    ) {
      toast.error("Unauthorized. Please log in.");
    }

    return Promise.reject(error);
  }
);

export default userAxios;
