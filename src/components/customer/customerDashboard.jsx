import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerDashboard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <h2>Hello {user.firstName} | customer</h2>
        <h3>Some data about your account:</h3>
        <Link className="btn btn-primary" to="/customer/address">
          Add Address
        </Link>
      </React.Fragment>
    );
  }
}

export default CustomerDashboard;
