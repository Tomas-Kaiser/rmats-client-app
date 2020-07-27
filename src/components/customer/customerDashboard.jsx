import React, { Component } from "react";

class CustomerDashboard extends Component {
  state = {};
  render() {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <h2>Hello Customer [name]</h2>
        <h3>Some data about your account:</h3>
      </React.Fragment>
    );
  }
}

export default CustomerDashboard;
