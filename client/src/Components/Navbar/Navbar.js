import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "./navbar.scss";
import GlobalContext from "../../Context/GlobalContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);

  console.log("log nav", isLoggedIn);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="nav" data-aos="zoom-in-down" data-dos-delay="20">
        <Link to="/">
          <div className="logo">Book Reviewer</div>
        </Link>
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className={`links-and-buttons ${menuOpen ? "open" : ""}`}>
          <div>
            <ul>
              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="auth-section">
            {!isLoggedIn && (
              <>
                <Link
                  to="/signin"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <button>Login</button>
                </Link>

                <Link
                  to="/signup"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <button>SignUp</button>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="books/allBooks" onClick={() => setMenuOpen(false)}>
                  <button>See Books</button>
                </Link>
                <Link to="books/add" onClick={() => setMenuOpen(false)}>
                  <button>Add Book</button>
                </Link>

                <Link
                  to="/"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    setIsLoggedIn(false);

                    toast.success("Logged Out 👋");
                    setMenuOpen(false);
                  }}
                >
                  <button1 className="bg-red-500 pointer px-[9px] py-[4px] rounded-[4px] ml-[10px] hover:bg-red-800">
                    Logout
                  </button1>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
