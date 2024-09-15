import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../Contexts/AuthProvider";
const NavBar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setsocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  const { email, logOut } = useContext(AuthContext);

  // auth info
  const { user } = useContext(AuthContext);
  console.log("hi I am" + user);

  //   Event Listener for header fixing
  window.addEventListener("scroll", (e) => {
    window.scrollY > 200 ? setHeaderFixed(true) : setHeaderFixed(false);
  });

  const navigate = useNavigate();
  function handleLogOut(e) {
    e.preventDefault();
    logOut();
    navigate("/");
  }
  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        {email.length === 0 ? (
          <div className="container">
            <div className="header-top-area">
              <Link to="/sign-up" className="lab-btn me-3">
                <span>Create Account</span>
              </Link>

              <Link to="/login">
                <span>Login</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="header-top-area">
              <Link to={`/orders`} className="lab-btn me-3 k">
                <span>Orders</span>
              </Link>
              <button onClick={handleLogOut} className="">
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/shop"}>Shop</Link>
                  </li>
                  {/* <li>
                    <Link to={"/blog"}>Blog</Link>
                  </li> */}
                  <li>
                    <Link to={"/about"}>About</Link>
                  </li>
                  <li>
                    <Link to={"/contact"}>Contact</Link>
                  </li>
                </ul>
              </div>

              {/* Sign in and login */}

              {email.length === 0 && (
                <>
                  <Link
                    to={`/sign-up`}
                    className="lab-btn me-3 d-none d-md-block"
                  >
                    Create Account
                  </Link>
                  <Link to={`/login`} className="d-none d-md-block">
                    Log In
                  </Link>
                </>
              )}

              {email.length !== 0 && (
                <>
                  <Link
                    to={`/orders`}
                    className="lab-btn me-3 d-none d-md-block"
                  >
                    Orders
                  </Link>
                  <button onClick={handleLogOut} className="d-none d-md-block">
                    Log Out
                  </button>
                </>
              )}

              {/* Menu toggler */}
              <div
                onClick={() => setMenuToggle((menuToggle) => !menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setsocialToggle(!socialToggle)}
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
