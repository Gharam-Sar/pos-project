import Navbar from "./Navbar";
import Products from "../routes/Products";
import PosPage from "../routes/PosPage";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Categories from "../routes/Categories";
import { CategoryType, ProductType } from "../App";
interface PosProps {
  handleLogout: Function;
  setCategories: Function;
  setProducts: Function;
  categories: CategoryType[];
  products:ProductType[];
}

export const Pos: React.FC<PosProps> = ({
  handleLogout,
  setCategories,
  setProducts,
  categories,
  products,
}) => {
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
      setCategories(result);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<PosPage />} />
          <Route
            path="/Categories"
            element={
              <Categories
                setCategories={setCategories}
                categories={categories}
                getCategories={getCategories}
              />
            }
          />
          <Route path="/Products" element={<Products setProducts={setProducts}
                products={products}
                categories={categories}
                getCategories={getCategories} />} />
        </Routes>
      </div>
    </>
  );
};
