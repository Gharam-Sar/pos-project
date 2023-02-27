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
  products,
  setCurrentProducts,
  currentProducts,
}) => {
  const [barcodeValue, setBarcodeValue] = React.useState<string>("");
  const [taxValue, setTaxValue] = React.useState<number>(0);
  const [discountValue, setDiscountValue] = React.useState<number>(0);
  const [invalidCode, setInvalidCode] = React.useState<boolean>(false);

  const subTotal = currentProducts.reduce(
    (accumulator, product) =>
      product.product
        ? accumulator + product.product.price * product.quantity
        : accumulator + 0,
    0
  );
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
  const handleCancelProduct = () => {
    setCurrentProducts([]);
    setTaxValue(0);
    setDiscountValue(0);
  };
  const handleCheckoutProduct = async () => {
    try {
      const str =
        "/checkout/" +
        subTotal +
        "/" +
        taxValue +
        "/" +
        discountValue +
        "/" +
        (subTotal + subTotal * taxValue - subTotal * discountValue);
      const response = await fetch(str, {
        method: "POST",
        body: JSON.stringify({
          subtotal: subTotal,
          tax: taxValue,
          discount: discountValue,
          total: subTotal + subTotal * taxValue - subTotal * discountValue,
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
      if (result === "OK") {
        setCurrentProducts([]);
        setTaxValue(0);
        setDiscountValue(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="carts-display-page">
      <div className="barcode-scanner-section">
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
      <div>
        <div className="checkout-item">
          <div className="checkout-title">Subtotal</div>
          <div>{subTotal}</div>
          <div>{currentProducts.length} Items</div>
        </div>
        <div className="checkout-item">
          <div className="checkout-title">Order TAX</div>
          <div>{subTotal * taxValue}</div>
          <div>
            <input
              value={taxValue}
              onChange={(e) => {
                setTaxValue(e.target.valueAsNumber);
              }}
              type="number"
              placeholder="enter tax value"
            />
          </div>
        </div>
        <div className="checkout-item">
          <div className="checkout-title">Discount</div>
          <div>{subTotal * discountValue}</div>
          <div>
            <input
              value={discountValue}
              onChange={(e) => {
                setDiscountValue(e.target.valueAsNumber);
              }}
              type="number"
              placeholder="enter tax value"
            />
          </div>
        </div>
        <div className="checkout-item">
          <div className="checkout-title">TOTAL</div>
          <div>{subTotal + subTotal * taxValue - subTotal * discountValue}</div>
          <div></div>
        </div>
        <div className="checkout-btns">
          <button className="cancel-btn" onClick={() => handleCancelProduct()}>
            Cancel
          </button>

          <button
            className="checkout-btn"
            onClick={() => handleCheckoutProduct()}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartsDisplay;
