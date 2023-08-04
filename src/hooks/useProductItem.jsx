import { useState, useEffect } from "react";

const useProductItem = (productId, token) => {
  const [productItem, setProductItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/v1/productItem/product/${productId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        setProductItem(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token]);

  return { productItem, loading, error };
};

export default useProductItem;
