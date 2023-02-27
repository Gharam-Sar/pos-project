import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { CategoryType } from "../types";
import { EditProductBackdrop } from "./EditProductBackdrop";

interface ProductProps {
  productId: number;
  productName: string;
  productCode: string;
  categoryName: string;
  productPrice: number;
  productImg: string;
  handleDelete: Function;
  setProducts: Function;
  categories: CategoryType[];
}

export const Product: React.FC<ProductProps> = ({
  productId,
  productName,
  productCode,
  categoryName,
  productPrice,
  productImg,
  handleDelete,
  setProducts,
  categories,
}) => {
  var image_path = "";
  try {
    image_path = require("../imgs/" + categoryName + "/" + productImg);
  } catch (err) {
    image_path = require("../logo.svg");
  }
  const [openEditBackdrop, setOpenEditBackdrop] =
    React.useState<boolean>(false);

  const handleEditBackdropOpen = () => {
    setOpenEditBackdrop(true);
  };

  const handleEditBackdropClose = () => {
    setOpenEditBackdrop(false);
  };
  const editProduct = async (
    productId: number,
    productName: string,
    productCode: string,
    productPrice: number,
    productCategory: string,
    productImg: string
  ) => {
    try {
      const str =
        "/editProduct/" +
        productId +
        "/" +
        productName +
        "/" +
        productCode +
        "/" +
        productPrice +
        "/" +
        productCategory +
        "/" +
        productImg;
      const response = await fetch(str, {
        method: "PUT",
        body: JSON.stringify({
          id: productId,
          name: productName,
          code: productCode,
          price: productPrice,
          category: productCategory,
          img: productImg,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result);
      handleEditBackdropClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <tr>
        <th>{productId}</th>
        <th>{productName}</th>
        <th>{productCode}</th>
        <th>{productPrice}</th>
        <th>{categoryName}</th>
        <th>
          <img
            alt={productName}
            width="100px"
            height="100px"
            src={image_path}
          />
        </th>

        <th>
          <FaTrash
            onClick={() => handleDelete(productId)}
            color="black"
            fontSize="25px"
          />
        </th>
        <th>
          <FaEdit
            onClick={() => handleEditBackdropOpen()}
            color="black"
            fontSize="25px"
          />
          {openEditBackdrop ? (
            <EditProductBackdrop
              handleBackdropClose={handleEditBackdropClose}
              productId={productId}
              editProduct={editProduct}
              productName={productName}
              productCategory={categoryName}
              productImg={productImg}
              productPrice={productPrice}
              productCode={productCode}
              categories={categories}
            />
          ) : null}
        </th>
      </tr>
    </>
  );
};
