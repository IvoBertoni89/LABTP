import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { ModalWrapper, ModalContent } from "./styledComponents/Modals";
import { useState } from "react";
import { CreateProduct } from "./CreateProduct";

export const DashboardProducts = ({ products }) => {
  console.log("productlist", products);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [updateModal, setUpdateModal] = useState(false);
  const [isPopUpActive, setIsPopUpActive] = useState(false);

  const { updateProduct } = useProducts();

  const handleUpdateModal = () => {
    setIsPopUpActive(true);
  };

  const handleCloseModal = () => {
    setIsPopUpActive(false);
  };

  const handleUpdateProduct = () => {
    updateProduct(updatedProduct);
    setIsPopUpActive(false);
  };

  return (
    <>
      <CreateProduct />
      <div className="flex justify-center">
        <ul className="flex flex-col">
          {products.map((product) => {
            return (
              <li className="flex my-5 justify-between" key={product.id}>
                <img
                  className="w-16 mx-3"
                  src={product.imageLink}
                  alt="productImage"
                />
                <p className="mx-3">Código: {product.code}</p>
                <p className="mx-3">{product.name}</p>
                <p className="mx-3">${product.price}</p>
                {product.discount > 0 && <p>Descuento: {product.discount}</p>}
                <button
                  onClick={() => {
                    handleUpdateModal();
                    setUpdatedProduct(product);
                  }}
                >
                  Actualizar este producto
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {isPopUpActive ? (
        <ModalWrapper>
          <ModalContent>
            <div className="flex flex-col">
              <h1>Actualizar producto</h1>
              <input
                type="text"
                placeholder="Nombre del producto"
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Precio del producto"
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Descripción del producto"
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Link de la imagen"
                onChange={(e) => {
                  setUpdatedProduct({
                    ...updatedProduct,
                    imageLink: e.target.value,
                  });
                }}
              />{" "}
              <button
                onClick={() => {
                  handleUpdateProduct();
                  handleUpdateModal();
                }}
              >
                Finalizar cambios
              </button>
              <button onClick={handleCloseModal}>Cancelar</button>
            </div>
          </ModalContent>
        </ModalWrapper>
      ) : null}
    </>
  );
};