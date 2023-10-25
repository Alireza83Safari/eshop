import React, { useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
const RoleTable = lazy(() => import("../../components/Admin/Roles/RoleTable"));
const EditRole = lazy(() => import("../../components/Admin/Roles/EditRole"));
const AddRoles = lazy(() => import("../../components/Admin/Roles/AddRoles"));
const PermissionInfo = lazy(() =>
  import("../../components/Admin/Roles/PermissionInfo")
);

export default function RolesPanel() {
  const [showAddRoles, setShowAddRoles] = useState(false);
  const [showEditRoles, setShowEditRoles] = useState(false);
  const [showPermissionInfo, setShowPermissionInfo] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [permissionInfo, setPermissionInfo] = useState(null);

  return (
    <section className="float-right mt-16 pt-6 md:px-6 px-2 h-screen pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <div className="bg-white-100 dark:bg-black-600 p-2 rounded-xl text-black-900 dark:text-white-100">
        <button
          className="bg-blue-600 text-white-100 text-sm rounded-lg py-1 px-3 ml-2"
          onClick={() => setShowAddRoles(true)}
        >
          Add New Role <FontAwesomeIcon icon={faPlus} />
        </button>
        <Suspense fallback={<Spinner />}>
          <RoleTable
            setPermissionInfo={setPermissionInfo}
            setEditRoleId={setEditRoleId}
            setShowPermissionInfo={setShowPermissionInfo}
            setShowEditRoles={setShowEditRoles}
          />
        </Suspense>
      </div>

      <Suspense fallback={<Spinner />}>
        {showAddRoles && (
          <AddRoles
            showAddRoles={showAddRoles}
            setShowAddRoles={setShowAddRoles}
          />
        )}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showEditRoles && (
          <EditRole
            setShowEditRoles={setShowEditRoles}
            editRoleId={editRoleId}
          />
        )}
      </Suspense>
      <Suspense fallback={<Spinner />}>
        {showPermissionInfo && (
          <PermissionInfo
            setShowPermissionInfo={setShowPermissionInfo}
            permissionInfo={permissionInfo}
          />
        )}
      </Suspense>
      <ToastContainer />
    </section>
  );
}
