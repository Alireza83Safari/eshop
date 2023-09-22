import React, { useEffect, useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import useFetch from "../../../../hooks/useFetch";
import { toast } from "react-toastify";
import Input from "../../Input";

export default function EditBrandData({
  setShowEditBrandData,
  brandEditId,
  fetchData,
  setShowEditBrandFile,
  setShowEditBrand,
}) {
  const [editBrand, setEditBrand] = useState({
    code: "",
    name: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const editBrandHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/brand/edit/${brandEditId?.id}`,
        editBrand
      );
      if (response.status == 200) {
        setShowEditBrandData(false);
        toast.success("edit brand is successfuly");
        setLoading(false);
        setShowEditBrandFile(true);
        setEditBrand({
          code: "",
          name: "",
        });
        setServerErrors("");
        fetchData();
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };
  const { datas, isLoading: brandLoading } = useFetch(
    `/brand/${brandEditId?.id}`,
    adminAxios
  );

  useEffect(() => {
    setEditBrand({ name: datas?.name, code: datas?.code });
  }, [datas]);

  const setEditBrandHandler = (event) => {
    setEditBrand({
      ...editBrand,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center">
        Edit Brand
      </span>

      <form
        onSubmit={editBrandHandler}
        className="w-full mx-auto bg-white rounded-lg"
      >
        <div
          className={` grid grid-cols-1 gap-6 mt-4 ${
            isLoading && brandLoading && "opacity-10"
          }`}
        >
          <div>
            <Input
              labelText="name"
              placeholder="brand name"
              name="name"
              value={editBrand?.name}
              onChange={setEditBrandHandler}
              Error={serverErrors?.name}
              callback={() => setServerErrors("")}
            />
          </div>

          <div>
            <Input
              labelText="code"
              placeholder="brand code"
              name="code"
              value={editBrand?.code}
              onChange={setEditBrandHandler}
              Error={serverErrors?.code}
              callback={() => setServerErrors("")}
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
          >
            {isLoading ? <FormSpinner /> : "Add Brand"}
          </button>
          <button
            type="submit"
            className=" w-full py-2 rounded-xl border border-blue-600 ml-2"
            onClick={() => {
              setShowEditBrandData(false);
              setShowEditBrand(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
