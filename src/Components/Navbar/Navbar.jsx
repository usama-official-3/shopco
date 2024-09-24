import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import "./navbar.css"

const Navbar = () => {

  const move = useNavigate();
  const cu = useSelector((store) => store.userSection.cu);
  const dispatch = useDispatch();

  function Logout() {
    dispatch({
      type: "LOGOUT_USER",
    });
    move("/login");
  }


  return <>
    <>
      <nav className="navbar navbar-expand-lg navbar-light  px-lg-5 px-sm-3" style={{ backgroundColor: "#F2F0F1" }}>
        <div className="container-fluid">
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <NavLink className="navbar-brand cursor" to="/">
              <img src="/logo.png" alt="" />
            </NavLink>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/products">
                      Clothes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/products">
                      Shoes
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Reviews
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className='d-flex fs-3 nav_display'>
              <div className=''>
                <NavLink
                  className="nav-link"
                  to={`/cart/${cu._id}`}
                ><BsCart />
                </NavLink>
              </div>
              <div className=''>
                {cu._id &&
                  <>
                    <NavLink
                      className="nav-link"
                      to={cu?.role === "admin" ? `/admin-dashboard`:`/user-profile/${cu._id}`}
                    ><CgProfile />
                    </NavLink>
                  </>
                }
                {!cu._id &&
                  <NavLink
                    className="nav-link btn login"
                    to="/login"
                  >
                    Login
                  </NavLink>
                }

              </div>
            </div>
          </div>

        </div>
      </nav>

    </>

  </>
}

export default Navbar