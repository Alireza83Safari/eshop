import { useState } from "react";

const usePost = () => {
  const [postData, setPostData] = useState(null);
  const [postIsloading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [responseOk, setResponseOk] = useState(false);

  const doPost = async (url, bodyData, headers = {}) => {
    setPostLoading(true);
    setPostError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
        },
        body: JSON.stringify(bodyData),
      });

      setResponseOk(response.ok);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const responseData = await response.json();
      setPostData(responseData);
    } catch (error) {
      setPostError(error.message);
    } finally {
      setPostLoading(false);
    }
  };

  return { postData, postIsloading, postError, doPost, responseOk };
};

export default usePost;
