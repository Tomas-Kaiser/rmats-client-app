import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h2>Hello {this.props.user.firstName} | admin</h2>

        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Review all customer's tickets</h5>
                  <Link to="/admin/tickets" className="btn btn-secondary">
                    Review Tickets
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">View all registered customers</h5>
                  <Link
                    to="/customer/address/new"
                    className="btn btn-secondary"
                  >
                    View Customers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
