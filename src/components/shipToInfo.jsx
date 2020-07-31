import React, { Component } from "react";
import Profile from "./profile";
import { getCustomerById } from "./../services/customerService";
import Address from "./address";
import { getAllAddresses } from "../services/addressService";
import { getAllAddressesByCustomerId } from "./../services/addressService";

class ShipToInfo extends Component {
  state = {
    customer: {},
    addresses: []
  };

  async componentDidMount() {
    const { user: admin, match } = this.props;

    // Get customer details
    try {
      const { data: customer } = await getCustomerById(admin, match.params.id);
      this.setState({ customer });

      // Get address by customer id
      try {
        const { data: addresses } = await getAllAddressesByCustomerId(
          admin,
          match.params.id
        );
        this.setState({ addresses });
        console.log("Addresses", addresses);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("Something went wrong");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }
  }

  render() {
    console.log("customer:", this.state.customer);
    return (
      <React.Fragment>
        <h1>Ship To Information</h1>

        <div className="row">
          <div className="col-6">
            <Profile user={this.state.customer} />
          </div>
          <div className="col-6">
            <h2 className="mt-2">Address</h2>
            <div className="d-sm-flex mt-3">
              {this.state.addresses.map((address, index) => (
                <div
                  key={address.id}
                  className="card mb-5 mr-4"
                  style={{ width: "18rem" }}
                >
                  <div className="card-header text-center font-weight-bold">
                    Address #{index + 1}{" "}
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{address.street}</li>
                    <li className="list-group-item">{address.zipCode}</li>
                    <li className="list-group-item">{address.city}</li>
                    <li className="list-group-item">{address.country}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShipToInfo;
