import Navbar from "../components/Navbar";
import Products from "./Products";
import PosPage from "./PosPage";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Categories from "./Categories";
import { CategoryType, ProductType } from "../types";
interface PosProps {
  handleLogout: Function;
  setCategories: Function;
  setProducts: Function;
  categories: CategoryType[];
  products: ProductType[];
}

export const Pos: React.FC<PosProps> = ({
  handleLogout,
  setCategories,
  setProducts,
  categories,
  products,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [somethingWrong, setSomethingWrong] = React.useState<boolean>(false);

  const getCategories = async () => {
    try {
      const response = await fetch("/categories", {
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
      setTimeout(() => {}, 20000);
      setIsLoading(false);
      setSomethingWrong(false);
      setCategories(result);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setSomethingWrong(true);
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
      setTimeout(() => {}, 20000);
      setIsLoading(false);
      setSomethingWrong(false);

      setProducts(result);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setSomethingWrong(true);
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <PosPage
                getCategories={getCategories}
                getProducts={getProducts}
                products={products}
                categories={categories}
              />
            }
          />
          <Route
            path="/Categories"
            element={
              <Categories
                setCategories={setCategories}
                categories={categories}
                getCategories={getCategories}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                somethingWrong={somethingWrong}
                setSomethingWrong={setSomethingWrong}
              />
            }
          />
          <Route
            path="/Products"
            element={
              <Products
                setProducts={setProducts}
                products={products}
                categories={categories}
                getCategories={getCategories}
                getProducts={getProducts}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                somethingWrong={somethingWrong}
                setSomethingWrong={setSomethingWrong}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};
