import React, { Component } from "react";
import CustomerTickets from "./customerTickets";

class CustomerDashboard extends Component {
  state = {};
  render() {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <h2>Hello Customer</h2>
        <h3>See Tickets:</h3>
        <CustomerTickets />
      </React.Fragment>
    );
  }
}

export default CustomerDashboard;
