import React from "react";

interface ProductStyleProps {
  productId: number;
  productName: string;
  productCode: string;
  categoryName: string;
  productPrice: number;
  productImg: string;
}

export const ProductStyle: React.FC<ProductStyleProps> = ({
  productId,
  productName,
  productCode,
  categoryName,
  productImg,
  productPrice,
}) => {
  var image_path = "";
  try {
    image_path = require("../imgs/" + categoryName + "/" + productImg);
  } catch (err) {
    image_path = require("../logo.svg");
  }
  const handleClick = () => {
    console.log(productName);
  };
  return (
    <div className="product-style" onClick={() => handleClick()}>
      <img alt={productName} width="120px" height="120px" src={image_path} />
      <div className="product-name-price">
        <span> {productName}</span> <span> {productPrice}</span>
      </div>
    </div>
  );
};
