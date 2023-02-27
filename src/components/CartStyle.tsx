import React from "react";
import { CartProductDetails } from "../types";
import CartProduct from "./CartProduct";
interface CartStyleProps {
  setCurrentProducts: Function;
  currentProducts: CartProductDetails[];
}

const CartStyle: React.FC<CartStyleProps> = ({
  setCurrentProducts,
  currentProducts,
}) => {
  return (
    <div className="cart-style">
      <div className="carts-product-table">
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>Product </th>
              <th>Price </th>
              <th>Quantity </th>
              <th>Total </th>
            </tr>
          </thead>
          <tbody title="cartProducts">
            {currentProducts.map((product) => {
              return (
                <CartProduct
                  setCurrentProducts={setCurrentProducts}
                  product={product}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CartStyle;
