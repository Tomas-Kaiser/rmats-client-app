import React, { Component } from "react";

class CustomerDashboard extends Component {
  state = {};
  render() {
    console.log(this.props.user);
    return <h2>Hello Customer</h2>;
  }
}

export default CustomerDashboard;
