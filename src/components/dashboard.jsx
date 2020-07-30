import React, { Component } from "react";
import CustomerDashboard from "./customer/customerDashboard";
import AdminDashboard from "./admin/adminDashboard";

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
            <AdminDashboard user={user} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
