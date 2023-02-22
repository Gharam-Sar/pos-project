import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
interface NavbarProps {
  handleLogout: Function;
}

export const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  return (
    <nav className="nav">
      <span className="big-title">Point Of Sale System</span>
      <ul>
        <NavLink className="router-link" title="Pos" to="/">
          {({ isActive }) => (
            <span className={isActive ? "nav-active" : "nav-not-active"}>
              POS
            </span>
          )}
        </NavLink>
        <NavLink className="router-link" title="Categories" to="/Categories">
          {({ isActive }) => (
            <span className={isActive ? "nav-active" : "nav-not-active"}>
              Categories
            </span>
          )}
        </NavLink>
        <NavLink className="router-link" title="Products" to="/Products">
          {({ isActive }) => (
            <span className={isActive ? "nav-active" : "nav-not-active"}>
              Products
            </span>
          )}
        </NavLink>
        <span onClick={() => handleLogout()}>
          {" "}
          <FaSignOutAlt color="#145f72" fontSize="25px" />
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
