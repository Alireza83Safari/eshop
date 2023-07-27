import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import productsContext from "../../Context/productsContext";

export default function ProductsTable({
  paginatedProducts,
  state,
  searchQuery,
  setProductId,
  setShowDeleteModal,
  setShowEditModal,
  setProductEditId,
  setEditProductInfos,
}) {
  const { getProducts } = useContext(productsContext);
  const editHandler = (id) => {
    setShowEditModal(true);
    setProductEditId(id);
    const productToEdit = getProducts.find((product) => product.id === id);

    if (productToEdit) {
      setEditProductInfos({
        name: productToEdit.name,
        img: productToEdit.img,
        price: productToEdit.price,
        sale: productToEdit.sale,
        status: productToEdit.status,
        category: productToEdit.category,
      });
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr className="md:text-sm text-xs text-center border-y">
          <th className="py-3">NO</th>
          <th className="py-3">PRODUCT</th>
          <th className="py-3">Image</th>
          <th className="py-3">Price</th>
          <th className="py-3">Sold</th>
          <th className="py-3 sm:block hidden">Status</th>
          <th className="py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedProducts
          .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((product) =>
            state.categoryFilter
              ? product.category === state.categoryFilter
              : true
          )
          .filter((product) =>
            state.statusFilter ? product.status === state.statusFilter : true
          )
          .map((product, index) => (
            <tr className="md:text-sm text-xs text-center" key={index}>
              <td className="py-2">{index + 1}</td>
              <td className="py-2 w-16">{product.name}</td>
              <td className="py-2">
                <img
                  src={product.img}
                  alt="product"
                  className="w-10 h-10 mx-auto"
                />
              </td>
              <td className="py-2">${product.price}</td>
              <td className="py-2">{product.sale}</td>
              <td className="sm:block hidden py-3">
                <button
                  className={`text-xs p-1 rounded-lg ${
                    product.status === "Publish"
                      ? "bg-green-500 text-white"
                      : "bg-red-700 text-white"
                  }`}
                >
                  {product.status}
                </button>
              </td>
              <td className="py-2 space-x-2">
                <button onClick={() => editHandler(product.id)}>
                  <FontAwesomeIcon icon={faEdit} className="text-orange-400" />
                </button>
                <button
                  className="px-2 py-1 rounded-md text-red-700 text-white"
                  onClick={() => {
                    setProductId(product.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
