import { useState, useEffect } from "react";

const useProductFile = (productId, token) => {
  const [productFile, setProductFile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/v1/file/${productId}/1`, {
          headers: {
            accept: "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        setProductFile(data);
        console.log(data);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token]);

  return { productFile, loading, error };
};

export default useProductFile;
