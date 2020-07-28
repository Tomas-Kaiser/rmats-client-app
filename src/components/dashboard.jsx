import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {/* Customer dashboard */}
        {!user.isAdmin && (
          <React.Fragment>
            <h2>Hello customer, {user.firstName}.</h2>
            <h3>Some data about your account:</h3>
          </React.Fragment>
        )}

        {/* Admin dashboard */}
        {user.isAdmin && (
          <React.Fragment>
            <h2>Hello admin, {user.firstName}.</h2>
            <h3>Some data about your account:</h3>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
