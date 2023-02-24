import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { CategoryType, ProductType } from "../App";
import { AddProductBackdrop } from "../components/AddProductBackdrop";
import { Product } from "../components/Product";
import SearchBar from "../components/SearchBar";
import { TableProductFooter } from "../components/TableProductFooter";
import useProductTable from "../components/useProductTable";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
interface ProductsProps {
  products: ProductType[];
  setProducts: Function;
  categories: CategoryType[];
  getCategories: Function;
}
const Products: React.FC<ProductsProps> = ({
  products,
  setProducts,
  categories,
  getCategories,
}) => {
  const [openAddBackdrop, setOpenAddBackdrop] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(5);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { slice, range } = useProductTable(products, page, size);
  const [chosenCategory, setChosenCategory] = React.useState<string>("");
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setChosenCategory(event.target.value as string);
  };
  const renderdProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterValue)
  );
  const filteredProducts = products.filter((product) =>
  product.category === chosenCategory);

  const handleAddBackdropOpen = () => {
    setOpenAddBackdrop(true);
  };

  const handleAddBackdropClose = () => {
    setOpenAddBackdrop(false);
  };
  const addProduct = async (
    productName: string,
    productCode: string,
    productPrice: number,
    productCategory: string,
    productImg: string
  ) => {
    try {
      const str =
        "/addProducts/" +
        productName +
        "/" +
        productCode +
        "/" +
        productPrice +
        "/" +
        productCategory +
        "/" +
        productImg;
      const response = await fetch(str, {
        method: "POST",
        body: JSON.stringify({
          name: productName,
          code: productCode,
          price: productPrice,
          category: productCategory,
          img: productImg,
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
      setProducts(result);
      handleAddBackdropClose();
    } catch (err) {
      console.log(err);
    }
  };
  const getProducts = async () => {
    try {
      const response = await fetch("/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const str = "/deleteProducts/" + id;
      const response = await fetch(str, {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
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
      setProducts(result);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getCategories();
    getProducts();
  },);
  return (
    <div className="category-table">
      <div className="add-category">
        <SearchBar
          filterValue={filterValue}
          onFilterValueChange={setFilterValue}
        />
         <Select
              sx={{ width: "200px", height: "30px", backgroundColor: "#b8b8b8",margin:"2%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chosenCategory}
              label="Display"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
        <div className="add-category-btn">
          <span>ADD NEW PRODUCT</span>
          <span>
            <FaPlusCircle
              onClick={() => handleAddBackdropOpen()}
              color="black"
              fontSize="30px"
            />
          </span>
        </div>
      </div>
      {openAddBackdrop ? (
        <AddProductBackdrop
          handleBackdropClose={handleAddBackdropClose}
          addProduct={addProduct}
          categories={categories}
        />
      ) : null}

      <table>
        <thead>
          <tr>
            <th>Product ID</th>
             <th>Product Name</th>
            <th>Product Code</th>
           
            <th>Product Price</th>
            <th>Product Category</th> 
                       <th>Product Image</th>

            <th>Delete Product</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filterValue !== ""
            ? renderdProducts.map((product) => (
                <Product
                  key={product.id}
                  productId={product.id}
                  productName={product.name}
                  productCode={product.code}
                  categoryName={product.category}
                  productPrice={product.price}
                  productImg={product.img}
                  handleDelete={handleDelete}
                  setProducts={setProducts}
                  categories={categories}
                />
              ))
            : slice.map((product) => (
              <Product
                  key={product.id}
                  productId={product.id}
                  productName={product.name}
                  productCode={product.code}
                  categoryName={product.category}
                  productPrice={product.price}
                  productImg={product.img}
                  handleDelete={handleDelete}
                  setProducts={setProducts}
                  categories={categories}

                />
              ))}
        </tbody>
      </table>
      {filterValue !== "" ? null : (
        <TableProductFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          setSize={setSize}
          size={size}
        />
      )}
    </div>
  );
};
export default Products;
