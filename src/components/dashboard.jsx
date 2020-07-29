import React, { Component } from "react";
import CustomerDashboard from "./customer/customerDashboard";

class Dashboard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {/* Customer dashboard */}
        {!user.isAdmin && (
          <React.Fragment>
            <CustomerDashboard user={user} />
          </React.Fragment>
        )}

        {/* Admin dashboard */}
        {user.isAdmin && (
          <React.Fragment>
            <h2>Hello {user.firstName} | admin</h2>
            <h3>Some data about your account:</h3>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
