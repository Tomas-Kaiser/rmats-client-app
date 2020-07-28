import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        rMATS
      </NavLink>
      <ul className="navbar-nav mr-auto">
        {!user && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/login">
              Customer Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              register
            </NavLink>
          </React.Fragment>
        )}
        {user && !user.isAdmin && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              {user.firstName}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customer/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customer/ticket/new">
              Create Ticket
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customer/tickets">
              See Tickets
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
        {user && user.isAdmin && (
          <React.Fragment>
            <NavLink className="nav-item nav-link" to="/profile">
              {user.firstName}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/admin/dashboard">
              Dashboard
            </NavLink>
            <NavLink className="nav-item nav-link" to="/admin/tickets">
              See Tickets
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
