import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          rMATS
        </NavLink>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/customer-login">
              Customer Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin-login">
              Admin Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              register
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
