import React from "react";
import { CategoryType, ProductType } from "../App";
import ProductDisplay from "../components/ProductDisplay";
interface PosPageProps {
  products: ProductType[];
  categories: CategoryType[];
  getCategories: Function;
  getProducts: Function;
}
const PosPage: React.FC<PosPageProps> = ({
  products,
  categories,
  getCategories,
  getProducts,
}) => {
  return (
    <div className="pos-page">
      <div className="carts-display">h</div>
      <div className="products-display">
        <ProductDisplay
          getCategories={getCategories}
          getProducts={getProducts}
          products={products}
          categories={categories}
        />
      </div>
    </div>
  );
};
export default PosPage;
