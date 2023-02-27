import * as React from "react";
import "./index.css";
import { Login } from "./components/Login";
// import { Provider, useSelector, useDispatch } from "react-redux";
import { Pos } from "./components/Pos";
import { BrowserRouter } from "react-router-dom";
import { CategoryType, ProductType } from "./types";

const App: React.FC = () => {
  const [login, setLogin] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const handleLogin = () => {
    setLogin(true);
    localStorage.setItem("PosLoginState", true.toString());
  };
  const handleLogout = () => {
    setLogin(false);
    localStorage.setItem("PosLoginState", false.toString());
  };
  React.useEffect(() => {
    const PosLoginState: boolean = JSON.parse(
      localStorage.getItem("PosLoginState")!
    );
    
    if (Boolean(PosLoginState)) {
      setLogin(PosLoginState);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        {login ? (
          <Pos
            handleLogout={handleLogout}
            setCategories={setCategories}
            setProducts={setProducts}
            categories={categories}
            products={products}
          />
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
