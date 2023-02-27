import React from "react";
import { CartProductDetails } from "../types";
interface CartStyleProps {
  setCurrentProducts: Function;
  currentProducts: CartProductDetails[];
}

const CartStyle: React.FC<CartStyleProps> = ({
  setCurrentProducts,
  currentProducts,
}) => {
  return (
    <div className="carts-style">
      <div className="carts-product-display">
        {currentProducts.map((product) => {
          return (
            <div>
              <span>{product.product?.name} </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CartStyle;
