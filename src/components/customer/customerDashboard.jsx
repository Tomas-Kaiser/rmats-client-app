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

        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Do you have a faulty unit?</h5>
                  <p className="card-text">
                    You can easily create a new ticket here.
                  </p>
                  <Link to="/customer/ticket/new" className="btn btn-secondary">
                    Create a Ticket
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">New delivery address?</h5>
                  <p className="card-text">
                    Do not worry, you can add your new address here.
                  </p>
                  <Link
                    to="/customer/address/new"
                    className="btn btn-secondary"
                  >
                    Add Address
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">Review Tickets</h5>
                  <p className="card-text">You can review your all tickets.</p>
                  <Link to="/customer/tickets" className="btn btn-secondary">
                    Review Tickets
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card ">
                <div className="card-body">
                  <h5 className="card-title">Your Address</h5>
                  <p className="card-text">
                    You can check your current address.
                  </p>
                  <Link to="/customer/address" className="btn btn-secondary">
                    Your Address
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

export default CustomerDashboard;
