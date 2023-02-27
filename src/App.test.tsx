import React from "react";
import { render, screen } from "@testing-library/react";
import { CategoryType, ProductType, CartProductDetails } from "./types";
import App from "./App";
import Categories from "./routes/Categories";
import Products from "./routes/Products";
import ProductDisplay from "./components/ProductDisplay";
import CartStyle from "./components/CartStyle";

test("Test Number of Displayed Categories", () => {
  const categories: CategoryType[] = [
    { id: 1, name: "cat1" },
    { id: 2, name: "cat2" },
    { id: 3, name: "cat3" },
  ];
  const dummyFunction = () => {};
  render(
    <Categories
      setCategories={dummyFunction}
      categories={categories}
      getCategories={dummyFunction}
      isLoading={false}
      setIsLoading={dummyFunction}
      somethingWrong={false}
      setSomethingWrong={dummyFunction}
    />
  );
  const DisplaySpace = screen.getByTitle("categoryTable");
  expect(DisplaySpace.children.length).toBe(3);
});
test("Test Number of Displayed Products in Products Page", () => {
  const products: ProductType[] = [
    {
      id: 1,
      name: "product1",
      code: "xxxx",
      category: "cat1",
      price: 20,
      img: "img",
    },
    {
      id: 2,
      name: "product2",
      code: "xxxx",
      category: "cat1",
      price: 20,
      img: "img",
    },
  ];
  let categories: CategoryType[] = [
    { id: 1, name: "cat1" },
    { id: 2, name: "cat2" },
    { id: 3, name: "cat3" },
  ];
  const dummyFunction = () => {};
  render(
    <Products
      setProducts={dummyFunction}
      products={products}
      categories={categories}
      getCategories={dummyFunction}
      getProducts={dummyFunction}
      isLoading={false}
      setIsLoading={dummyFunction}
      somethingWrong={false}
      setSomethingWrong={dummyFunction}
    />
  );
  const DisplaySpace = screen.getByTitle("productTable");
  expect(DisplaySpace.children.length).toBe(2);
});
test("Test Number of Displayed Products in Pos Page", () => {
  const products: ProductType[] = [
    {
      id: 1,
      name: "product1",
      code: "xxxx",
      category: "cat1",
      price: 20,
      img: "img",
    },
    {
      id: 2,
      name: "product2",
      code: "xxxx",
      category: "cat1",
      price: 20,
      img: "img",
    },
    {
      id: 3,
      name: "product3",
      code: "xxxx",
      category: "cat1",
      price: 20,
      img: "img",
    },
  ];
  let categories: CategoryType[] = [
    { id: 1, name: "cat1" },
    { id: 2, name: "cat2" },
    { id: 3, name: "cat3" },
  ];
  const dummyFunction = () => {};
  render(
    <ProductDisplay
      getCategories={dummyFunction}
      getProducts={dummyFunction}
      products={products}
      categories={categories}
      setCurrentProducts={dummyFunction}
    />
  );
  const DisplaySpace = screen.getByTitle("productGrid");
  expect(DisplaySpace.children.length).toBe(3);
});
test("Test Number of Displayed Products in the Cart", () => {
  const currentProducts: CartProductDetails[] = [
    {
      product: {
        id: 1,
        name: "product1",
        code: "xxxx",
        category: "cat1",
        price: 20,
        img: "img",
      },
      quantity: 2,
    },
    {
      product: {
        id: 2,
        name: "product2",
        code: "xxxx",
        category: "cat1",
        price: 20,
        img: "img",
      },
      quantity: 5,
    },
    {
      product: {
        id: 3,
        name: "product3",
        code: "xxxx",
        category: "cat1",
        price: 20,
        img: "img",
      },
      quantity: 2,
    },
  ];
  const dummyFunction = () => {};
  render(
    <CartStyle
      setCurrentProducts={dummyFunction}
      currentProducts={currentProducts}
    />
  );
  const DisplaySpace = screen.getByTitle("cartProducts");
  expect(DisplaySpace.children.length).toBe(3);
});
