import React, { useState } from "react";
import SelectDiscount from "../SelectDiscount";
import AddProductDiscount from "./AddProductDiscount";
import AddUserDiscount from "./AddUserDiscount";
import AddGlobalDiscount from "./AddGlobalDiscount";

export default function AddDiscount() {
  const [showProductDiscount, setShowProductDiscount] = useState(false);
  const [showUserDiscount, setShowUserDiscount] = useState(false);
  const [showGlobalDiscount, setShowGlobalDiscount] = useState(false);
  const [showSelectDiscount, setShowSelectDiscount] = useState(true);

  return (
    <div className="bg-white-100 p-5 rounded-xl dark:bg-black-200 dark:text-white-100 h-[27rem] lg:my-5 sm:my-5 lg:mb-0 mb-5 sm:col-span-2 col-span-3">
      {showSelectDiscount && (
        <SelectDiscount
          setShowProductDiscount={setShowProductDiscount}
          setShowUserDiscount={setShowUserDiscount}
          setShowSelectDiscount={setShowSelectDiscount}
          setShowGlobalDiscount={setShowGlobalDiscount}
        />
      )}

      {showProductDiscount && (
        <AddProductDiscount
          setShowProductDiscount={setShowProductDiscount}
          setShowSelectDiscount={setShowSelectDiscount}
        />
      )}
      {showUserDiscount && (
        <AddUserDiscount
          setShowSelectDiscount={setShowSelectDiscount}
          setShowUserDiscount={setShowUserDiscount}
        />
      )}
      {showGlobalDiscount && (
        <AddGlobalDiscount
          setShowSelectDiscount={setShowSelectDiscount}
          setShowGlobalDiscount={setShowGlobalDiscount}
        />
      )}
    </div>
  );
}
