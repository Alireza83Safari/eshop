import { useState } from "react";
import instance from "../api/userInterceptors";
const usePost = () => {
  const [postData, setPostData] = useState(null);
  const [postIsloading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [responseOk, setResponseOk] = useState(false);

  const doPost = async (url, bodyData, headers = {}) => {
    setPostLoading(true);
    setPostError(null);

    try {
      const response = await instance.post(url, bodyData, {
        headers: {
          ...headers,
        },
        body: JSON.stringify(),
      });

      console.log(response);
      setResponseOk(response.ok);
      setPostError(response.status);
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      setPostData(response);
      const responseData = await response.json();
    } catch (error) {
      setPostError(error);
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };

  return { postData, postIsloading, postError, doPost, responseOk };
};

export default usePost;
