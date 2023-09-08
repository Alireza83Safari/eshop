import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import SelectDiscount from "./SelectDiscount";
import UserDiscount from "./UserDiscount";
import ProductDiscount from "./ProductDiscount";

export default function AddNewProduct() {
  const { showDiscount, setShowDiscount } = useContext(ProductsPanelContext);
  const [showProductDiscount, setShowProductDiscount] = useState(false);
  const [showUserDiscount, setShowUserDiscount] = useState(false);

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="w-1/4 bg-white-100 p-5 rounded-xl">
        {showDiscount && (
          <SelectDiscount
            showDiscount={showDiscount}
            setShowUserDiscount={setShowUserDiscount}
            setShowProductDiscount={setShowProductDiscount}
            setShowDiscount={setShowDiscount}
          />
        )}
        {showUserDiscount && (
          <UserDiscount setShowUserDiscount={setShowUserDiscount} />
        )}
        {showProductDiscount && (
          <ProductDiscount setShowProductDiscount={setShowProductDiscount} />
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
