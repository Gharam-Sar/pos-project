import React from "react";
import { CartProductDetails, ProductType } from "../types";
import CartStyle from "./CartStyle";
interface CartsDisplayProps {
  products: ProductType[];
  getProducts: Function;
  setCurrentProducts: Function;
  currentProducts: CartProductDetails[];
}
const CartsDisplay: React.FC<CartsDisplayProps> = ({
  getProducts,
  products,
  setCurrentProducts,
  currentProducts,
}) => {
  const [barcodeValue, setBarcodeValue] = React.useState<string>("");
  const [invalidCode, setInvalidCode] = React.useState<boolean>(false);

  const handleAddProduct = () => {
    setCurrentProducts((prev: CartProductDetails[]) => {
      const allProducts = products.find(
        (product) => product.code === barcodeValue
      );
      if (allProducts === undefined) {
        setBarcodeValue("");
        setInvalidCode(true);
        setTimeout(() => {
          setInvalidCode(false);
        }, 2000);
        return prev;
      } else {
        const renderdProducts = prev.find(
          (product) => product.product?.code === barcodeValue
        );
        if (renderdProducts === undefined) {
          const newProduct = [
            ...prev,
            {
              product: allProducts,
              quantity: 1,
            },
          ];
          setBarcodeValue("");

          return newProduct;
        } else {
          setBarcodeValue("");
          return prev;
        }
      }
    });
  };
  return (
    <div className="carts-display-page">
      <div className="barcode-scanner-section">
        {" "}
        <input
          value={barcodeValue}
          onChange={(e) => {
            setBarcodeValue(e.target.value.toLowerCase());
          }}
          type="text"
          className="barcode-scanner"
          placeholder="enter code here to simulate device"
        />
        <button onClick={() => handleAddProduct()}>ADD</button>
      </div>
      {invalidCode ? <div>code is invalid, try again</div> : null}
      <div>
        <CartStyle
          setCurrentProducts={setCurrentProducts}
          currentProducts={currentProducts}
        />
      </div>
    </div>
  );
};
export default CartsDisplay;
