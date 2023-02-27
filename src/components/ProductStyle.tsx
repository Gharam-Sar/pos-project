import React from "react";
import { CartProductDetails } from "../types";

interface ProductStyleProps {
  productId: number;
  productName: string;
  productCode: string;
  categoryName: string;
  productPrice: number;
  productImg: string;
  setCurrentProducts: Function;
}

export const ProductStyle: React.FC<ProductStyleProps> = ({
  productId,
  productName,
  productCode,
  categoryName,
  productImg,
  productPrice,
  setCurrentProducts,
}) => {
  var image_path = "";
  try {
    image_path = require("../imgs/" + categoryName + "/" + productImg);
  } catch (err) {
    image_path = require("../logo.svg");
  }
  const handleAddProduct = (
    productId: number,
    productName: string,
    productCode: string,
    categoryName: string,
    productPrice: number,
    productImg: string
  ) => {
    setCurrentProducts((prev: CartProductDetails[]) => {
      const renderdProducts = prev.find(
        (product) => product.product?.id === productId
      );
      if (renderdProducts === undefined) {
        const newProduct = [
          ...prev,
          {
            product: {
              id: productId,
              name: productName,
              code: productCode,
              category: categoryName,
              price: productPrice,
              img: productImg,
            },
            quantity: 1,
          },
        ];
        return newProduct;
      } else return prev;
    });
  };
  return (
    <div
      className="product-style"
      onClick={() =>
        handleAddProduct(
          productId,
          productName,
          productCode,
          categoryName,
          productPrice,
          productImg
        )
      }
    >
      <img alt={productName} width="120px" height="120px" src={image_path} />
      <div className="product-name-price">
        <span> {productName}</span> <span> {productPrice}</span>
      </div>
    </div>
  );
};
