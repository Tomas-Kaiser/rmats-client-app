import React, { Component } from "react";
import Profile from "./profile";
import { getCustomerById } from "./../services/customerService";

class ShipToInfo extends Component {
  state = {
    customer: {}
  };

  async componentDidMount() {
    const { user: admin, match } = this.props;
    try {
      const { data: customer } = await getCustomerById(admin, match.params.id);
      this.setState({ customer });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Ship To Information</h1>

        <div className="row">
          <div className="col-3">
            <h3>Customer details here</h3>
            <Profile user={this.state.customer} />
          </div>
          <div className="col">Address here</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShipToInfo;
