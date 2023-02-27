import React from "react";
import { CartProductDetails, CategoryType, ProductType } from "../types";
import ProductDisplay from "../components/ProductDisplay";
import CartsDisplay from "../components/CartsDisplay";
interface PosPageProps {
  products: ProductType[];
  categories: CategoryType[];
  getCategories: Function;
  getProducts: Function;
}

const PosPage: React.FC<PosPageProps> = ({
  categories,
  getCategories,
  getProducts,
  products,
}) => {
  const [currentProducts, setCurrentProducts] = React.useState<
    CartProductDetails[]
  >([]);
  React.useEffect(() => {
    if (categories.length === 0) getCategories();
    if (products.length === 0) {
      getProducts();
    }
  });
  return (
    <div className="pos-page">
      <div className="carts-display">
        <CartsDisplay
          getProducts={getProducts}
          products={products}
          setCurrentProducts={setCurrentProducts}
          currentProducts={currentProducts}
        />
      </div>
      <div className="products-display">
        <ProductDisplay
          getCategories={getCategories}
          getProducts={getProducts}
          products={products}
          categories={categories}
          setCurrentProducts={setCurrentProducts}
        />
      </div>
    </div>
  );
};
export default PosPage;
