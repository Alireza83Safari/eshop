import { useState } from "react";
import userAxios from "../services/Axios/userInterceptors";
import toast from "react-hot-toast";

const useAddToCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (productID, quantity, product) => {
    setIsLoading(true);

    let productData = {
      productItemId: productID,
      quantity: quantity,
    };

    try {
      const response = await userAxios.post("/orderItem", productData);

      if (response.status === 200) {
        toast.success(`${product.name} added to cart!`, {
          position: "bottom-right",
        });
        setIsLoading(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCart, isLoading, error };
};

export default useAddToCart;
