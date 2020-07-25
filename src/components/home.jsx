import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>This is home page</h1>
        <Link className="btn btn-primary" to="/customer-login">
          Customer Login
        </Link>
        <Link className="btn btn-secondary m-2" to="/admin-login">
          Admin Login
        </Link>
        <Link className="btn btn-secondary" to="/register">
          Registration
        </Link>
      </React.Fragment>
    );
  }
}

export default Home;
