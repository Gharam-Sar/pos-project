import Navbar from "./Navbar";
import Products from "../routes/Products";
import PosPage from "../routes/PosPage";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Categories from "../routes/Categories";
import { CategoryType } from "../App";
interface PosProps {
  handleLogout: Function;

  setCategories: Function;
  setProducts: Function;
  categories: CategoryType[];
}

export const Pos: React.FC<PosProps> = ({
  handleLogout,
  setCategories,
  setProducts,
  categories,
}) => {
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
              />
            }
          />
          <Route path="/Products" element={<Products />} />
        </Routes>
      </div>
    </>
  );
};
