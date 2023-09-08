import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify

const userAxios = axios.create({
  baseURL: "/api/v1/user/",
  withCredentials: true,
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
        "http://localhost:3000/api/v1/user/is_authenticated"
    ) {
      toast.error("Unauthorized. Please log in.");
    }

    return Promise.reject(error);
  }
);

export default userAxios;
