import React from "react";
import { CartProductDetails } from "../types";
import { FaTimesCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

interface CartProductProps {
  setCurrentProducts: Function;
  product: CartProductDetails;
}

const CartProduct: React.FC<CartProductProps> = ({
  setCurrentProducts,
  product,
}) => {
  const handleIncreaseQuantity = () => {
    setCurrentProducts((prev: CartProductDetails[]) => {
      const newProducts = prev.map((prod) => {
        if (prod.product?.id === product.product?.id) {
          prod.quantity += 1;
        }
        return prod;
      });
      return newProducts;
    });
  };
  const handleDecreaseQuantity = () => {
    setCurrentProducts((prev: CartProductDetails[]) => {
      const newProducts = prev.map((prod) => {
        if (prod.product?.id === product.product?.id) {
          if (prod.quantity > 1) prod.quantity -= 1;
        }
        return prod;
      });
      return newProducts;
    });
  };
  const handleDeleteProduct = () => {
    setCurrentProducts((prev: CartProductDetails[]) => {
      const renderdProducts = prev.find(
        (prod) => prod.product?.id === product.product?.id
      );
      if (renderdProducts !== undefined) {
        const index = prev.indexOf(renderdProducts);
        const newProducts = prev.slice(0);
        newProducts.splice(index, 1);
        return newProducts;
      } else return prev;
    });
  };
  return (
    <tr>
      <th>
        <FaTimesCircle
          color="black"
          fontSize="25px"
          onClick={() => handleDeleteProduct()}
        />
      </th>
      <th>{product.product?.name} </th>
      <th>{product.product?.price} </th>
      <th>
        <FaMinus
          className="plus-minus"
          color="black"
          fontSize="20px"
          onClick={() => handleDecreaseQuantity()}
        />
        {"  "}
        {product.quantity}
        {"  "}
        <FaPlus
          className="plus-minus"
          color="black"
          fontSize="20px"
          onClick={() => handleIncreaseQuantity()}
        />{" "}
      </th>
      <th>
        {product.product ? product.quantity * product.product.price : null}{" "}
      </th>
    </tr>
  );
};
export default CartProduct;
