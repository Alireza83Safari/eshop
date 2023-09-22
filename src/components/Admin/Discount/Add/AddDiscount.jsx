import React, { useState, lazy, Suspense } from "react";
import Spinner from "../../../Spinner/Spinner";
const SelectDiscount = lazy(() => import("../SelectDiscount"));
const AddProductDiscount = lazy(() => import("./AddProductDiscount"));
const AddUserDiscount = lazy(() => import("./AddUserDiscount"));
const AddGlobalDiscount = lazy(() => import("./AddGlobalDiscount"));

export default function AddDiscount() {
  const [showProductDiscount, setShowProductDiscount] = useState(false);
  const [showUserDiscount, setShowUserDiscount] = useState(false);
  const [showGlobalDiscount, setShowGlobalDiscount] = useState(false);
  const [showSelectDiscount, setShowSelectDiscount] = useState(true);

  return (
    <div className="bg-white-100 md:py-5 py-2 px-4 rounded-xl dark:bg-black-200 2xl:h-[33.9rem] dark:text-white-100 min-w-full mb-5">
      <Suspense fallback={<Spinner />}>
        {showSelectDiscount && (
          <SelectDiscount
            setShowProductDiscount={setShowProductDiscount}
            setShowUserDiscount={setShowUserDiscount}
            setShowSelectDiscount={setShowSelectDiscount}
            setShowGlobalDiscount={setShowGlobalDiscount}
          />
        )}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showProductDiscount && (
          <AddProductDiscount
            setShowProductDiscount={setShowProductDiscount}
            setShowSelectDiscount={setShowSelectDiscount}
          />
        )}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showUserDiscount && (
          <AddUserDiscount
            setShowSelectDiscount={setShowSelectDiscount}
            setShowUserDiscount={setShowUserDiscount}
          />
        )}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showGlobalDiscount && (
          <AddGlobalDiscount
            setShowSelectDiscount={setShowSelectDiscount}
            setShowGlobalDiscount={setShowGlobalDiscount}
          />
        )}
      </Suspense>
    </div>
  );
}
