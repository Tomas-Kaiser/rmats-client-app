import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <h2>Hello {this.props.user.firstName}</h2>
        <h3>Some data about your account:</h3>
      </React.Fragment>
    );
  }
}

export default Dashboard;
