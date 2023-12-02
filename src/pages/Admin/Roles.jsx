import React, { useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner/Spinner";
import useAccess from "../../hooks/useAccess";
import toast, { Toaster } from "react-hot-toast";
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

  const { userHaveAccess } = useAccess("action_role_admin_create");
  const showAddRoleHandler = () => {
    if (userHaveAccess) {
      setShowAddRoles(true);
    } else {
      toast.error("You Havent Access Add Role");
    }
  };
  return (
    <Suspense fallback={<Spinner />}>
      <section className="float-right sm:mt-16 mt-14 pt-6 md:px-6 px-2 h-screen pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
        <div className="bg-white-100 dark:bg-black-600 p-2 rounded-xl text-black-900 dark:text-white-100">
          <button
            className="bg-blue-600 text-white-100 text-sm rounded-lg py-2 px-3 ml-2 my-2"
            onClick={() => showAddRoleHandler()}
          >
            Add New Role <FontAwesomeIcon icon={faPlus} />
          </button>
          <RoleTable
            setPermissionInfo={setPermissionInfo}
            setEditRoleId={setEditRoleId}
            setShowPermissionInfo={setShowPermissionInfo}
            setShowEditRoles={setShowEditRoles}
          />
        </div>

        {showAddRoles && (
          <AddRoles
            showAddRoles={showAddRoles}
            setShowAddRoles={setShowAddRoles}
          />
        )}
        {showEditRoles && (
          <EditRole
            setShowEditRoles={setShowEditRoles}
            editRoleId={editRoleId}
          />
        )}
        {showPermissionInfo && (
          <PermissionInfo
            setShowPermissionInfo={setShowPermissionInfo}
            permissionInfo={permissionInfo}
          />
        )}
        <Toaster />
      </section>
    </Suspense>
  );
}
