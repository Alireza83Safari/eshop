import React, { useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner/Spinner";
import { ToastContainer } from "react-toastify";
const RoleTable = lazy(() => import("./RoleTable"));
const EditRole = lazy(() => import("./EditRole"));
const AddRoles = lazy(() => import("./AddRoles"));
const PermissionInfo = lazy(() => import("./PermissionInfo"));

export default function RolesPanel() {
  const [showAddRoles, setShowAddRoles] = useState(false);
  const [showEditRoles, setShowEditRoles] = useState(false);
  const [showPermissionInfo, setShowPermissionInfo] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [permissionInfo, setPermissionInfo] = useState(null);

  return (
    <section className="float-right mt-12 md:px-6 px-2 h-screen pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <h2 className="text-lg font-semibold mb-4">Roles</h2>
      <div className="bg-white-100 dark:bg-black-600 p-3 rounded-xl text-black-900 dark:text-white-100">
        <button
          className="bg-blue-600 text-white-100 text-sm rounded-lg py-2 px-3 mb-2"
          onClick={() => setShowAddRoles(true)}
        >
          Add new Role <FontAwesomeIcon icon={faPlus} />
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
