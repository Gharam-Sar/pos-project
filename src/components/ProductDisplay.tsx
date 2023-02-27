import React from "react";
import { CategoryType, ProductType } from "../types";
import { ProductStyle } from "./ProductStyle";
import SearchBar from "./SearchBar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { SelectChangeEvent } from "@mui/material";
interface ProductDisplayProps {
  products: ProductType[];
  categories: CategoryType[];
  getCategories: Function;
  getProducts: Function;
  setCurrentProducts: Function;
}
const ProductDisplay: React.FC<ProductDisplayProps> = ({
  products,
  categories,
  setCurrentProducts,
}) => {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [chosenCategory, setChosenCategory] = React.useState<string>("");

  const renderdCategoryProducts = products.filter(
    (product) => product.category === chosenCategory
  );
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setChosenCategory(event.target.value as string);
  };
  const renderdProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterValue)
  );

  return (
    <div className="product-display-page">
      <SearchBar
        filterValue={filterValue}
        onFilterValueChange={setFilterValue}
      />{" "}
      <Select
        sx={{
          width: "200px",
          height: "30px",
          backgroundColor: "white",
          marginLeft: "5%",
          marginBottom: "5%",
        }}
        value={chosenCategory}
        label="Display"
        onChange={handleChange}
      >
        <MenuItem value="">""</MenuItem>

        {categories.map((category) => (
          <MenuItem value={category.name}>{category.name}</MenuItem>
        ))}
      </Select>
      <div title="productGrid" className="product-display-style">
        {filterValue !== ""
          ? renderdProducts.map((product) => (
              <ProductStyle
                key={product.id}
                productId={product.id}
                productName={product.name}
                productCode={product.code}
                categoryName={product.category}
                productImg={product.img}
                productPrice={product.price}
                setCurrentProducts={setCurrentProducts}
              />
            ))
          : chosenCategory !== ""
          ? renderdCategoryProducts.map((product) => (
              <ProductStyle
                key={product.id}
                productId={product.id}
                productName={product.name}
                productCode={product.code}
                categoryName={product.category}
                productImg={product.img}
                productPrice={product.price}
                setCurrentProducts={setCurrentProducts}
              />
            ))
          : products.map((product) => (
              <ProductStyle
                key={product.id}
                productId={product.id}
                productName={product.name}
                productCode={product.code}
                categoryName={product.category}
                productImg={product.img}
                productPrice={product.price}
                setCurrentProducts={setCurrentProducts}
              />
            ))}
      </div>
    </div>
  );
};
export default ProductDisplay;
