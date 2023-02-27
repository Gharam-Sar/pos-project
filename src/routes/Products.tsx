import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { CategoryType, ProductType } from "../types";
import { AddProductBackdrop } from "../components/AddProductBackdrop";
import { Product } from "../components/Product";
import SearchBar from "../components/SearchBar";
import { TableProductFooter } from "../components/TableProductFooter";
import useProductTable from "../components/useProductTable";

interface ProductsProps {
  products: ProductType[];
  setProducts: Function;
  categories: CategoryType[];
  getCategories: Function;
  getProducts: Function;
  isLoading: boolean;
  setIsLoading: Function;
  somethingWrong: boolean;
  setSomethingWrong: Function;
}
const Products: React.FC<ProductsProps> = ({
  products,
  setProducts,
  categories,
  getCategories,
  getProducts,
  isLoading,
  setIsLoading,
  somethingWrong,
  setSomethingWrong,
}) => {
  const [openAddBackdrop, setOpenAddBackdrop] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>(5);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { slice, range } = useProductTable(products, page, size);

  const renderdProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterValue)
  );

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
      setSomethingWrong(false);

      setProducts(result);
      handleAddBackdropClose();
    } catch (err) {
      console.log(err);
      setSomethingWrong(true);
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
      setSomethingWrong(false);

      setProducts(result);
    } catch (err) {
      console.log(err);
      setSomethingWrong(true);
    }
  };
  React.useEffect(() => {
    if (products.length === 0) {
      setIsLoading(true);
    }
    getCategories();
    getProducts();
  });
  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : somethingWrong ? (
        <span className="server-err">
          Something went Wrong with the server, try refreshing the page
        </span>
      ) : (
        <div className="category-product-table">
          <div className="add-category-product">
            <SearchBar
              filterValue={filterValue}
              onFilterValueChange={setFilterValue}
            />
            <div
              className="add-category-product-btn"
              onClick={() => handleAddBackdropOpen()}
            >
              <span>ADD NEW PRODUCT</span>
              <span>
                <FaPlusCircle color="black" fontSize="30px" />
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
            <tbody title="productTable">
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
      )}
    </>
  );
};
export default Products;
