import React, { useState, lazy, Suspense } from "react";

const AppPicTable = lazy(() =>
  import("../../components/Admin/Appics/AppPicTable")
);
const AddAppPic = lazy(() => import("../../components/Admin/Appics/AddAppPic"));
const EditAppPic = lazy(() =>
  import("../../components/Admin/Appics/EditAppPic")
);
const AddAppPicFile = lazy(() =>
  import("../../components/Admin/Appics/AddAppPicFile")
);

export default function AppPic() {
  const [showAddAppPic, setShowAddAppPic] = useState(false);
  const [showEditAppPic, setShowEditAppPic] = useState(false);
  const [showFileAppPic, setShowFileAppPic] = useState(false);
  const [appPicId, setAppPicId] = useState(null);
  const [editAppPicId, setEditAppPicId] = useState(null);

  return (
    <section className="float-right md:px-6 px-2 h-screen pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <Suspense fallback={<div>Loading...</div>}>
        <AppPicTable
          setShowAddAppPic={setShowAddAppPic}
          setShowEditAppPic={setShowEditAppPic}
          setEditAppPicId={setEditAppPicId}
        />

        {showAddAppPic && (
          <AddAppPic
            setShowAddAppPic={setShowAddAppPic}
            setAppPicId={setAppPicId}
            setShowFileAppPic={setShowFileAppPic}
          />
        )}

        {showEditAppPic && (
          <EditAppPic
            setShowEditAppPic={setShowEditAppPic}
            editAppPicId={editAppPicId}
          />
        )}

        {showFileAppPic && (
          <AddAppPicFile
            setShowFileAppPic={setShowFileAppPic}
            appPicId={appPicId}
          />
        )}
      </Suspense>
    </section>
  );
}
