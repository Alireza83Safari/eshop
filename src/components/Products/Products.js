import React, { useContext, useState } from "react";
import productsContext from "../../Context/productsContext";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";
import DeleteModal from "./DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Products() {
  const [productId, setProductId] = useState(null);
  const { getProducts, getAllProducts } = useContext(productsContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [editProductInfos, setEditProductInfos] = useState({
    name: "",
    img: "",
    price: "",
    sale: "",
    status: "",
  });

  const deleteProductHandler = () => {
    setShowDeleteModal(true);
    fetch(`http://localhost:9000/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProducts();
      })
      .catch((err) => console.log(err));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

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
      });
    }
  };

  return (
    <section className="p-6 float-right mt-12 h-[100vh] bg-white-200 dark:bg-black-600 w-[87%]">
      <div className="mt-5 px-6 container overflow-x-auto bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
        <div className="py-4 flex justify-between">
          <div className="flex items-center relative ml-3 text-black-600">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 text-black-800 text-sm"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 py-1 rounded-lg outline-none bg-white-200 placeholder:text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="text-xs bg-blue-600 text-white-10 px-2 rounded-lg mr-7"
            onClick={() => setShowAddProduct(true)}
          >
            Add Product <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="text-xs grid grid-cols-11 border-b py-3">
              <th className="col-span-1">NO</th>
              <th className="col-span-2">PRODUCT Name</th>
              <th className="col-span-2">Image</th>
              <th className="col-span-2">Price</th>
              <th className="col-span-2">Sold</th>
              <th className="col-span-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {getProducts
              .filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product, index) => (
                <tr
                  className="text-sm grid grid-cols-11 text-center"
                  key={index}
                >
                  {console.log(product.name)}

                  <td className="col-span-1 py-2 h-14">{index + 1}</td>
                  <td className="col-span-2 py-2 h-14">{product.name}</td>
                  <td className="col-span-2 py-2 h-14 flex justify-center">
                    <img src={product.img} alt="product" className="w-10" />
                  </td>
                  <td className="col-span-2 py-2 h-14">${product.price}</td>
                  <td className="col-span-2 py-2 h-14">{product.sale}</td>
                  <td className="col-span-2 py-2 h-14">
                    <button
                      className="bg-green-200 text-white-100 mx-2 px-2 rounded-md"
                      onClick={() => editHandler(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red text-white-100 mx-2 px-2 rounded-md"
                      onClick={() => {
                        setProductId(product.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showAddProduct ? (
        <AddNewProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
        />
      ) : null}

      <EditProduct
        editProductInfos={editProductInfos}
        setEditProductInfos={setEditProductInfos}
        productEditId={productEditId}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
      <DeleteModal
        deleteHandler={deleteProductHandler}
        cancelDelete={cancelDelete}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </section>
  );
}
