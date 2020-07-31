import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron mt-5">
          <h1 className="display-4">Welcome to our RMA Ticket System</h1>
          <p className="lead">This is your helper to manage your RMA easily!</p>
          <hr className="my-4" />
          <p className="lead">
            If you do not have an account yet, please do so below:
          </p>
          <Link to="register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
