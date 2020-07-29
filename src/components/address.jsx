import React, { Component } from "react";
import { getAllAddresses } from "../services/addressService";

class Address extends Component {
  state = {
    addresses: []
  };

  async componentDidMount() {
    const { user } = this.props;

    const { data: addresses } = await getAllAddresses(user);
    this.setState({ addresses });
    console.log("Daaata: ", addresses);
  }

  handleDelete() {
    console.log("Address Deleted");
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="mt-3">Your address listed below:</h2>
        <div className="d-sm-flex mt-5">
          {this.state.addresses.map(address => (
            <div
              key={address.id}
              className="card mb-5 mr-4"
              style={{ width: "18rem" }}
            >
              <div className="card-header text-right font-weight-bold">
                Address #{address.id}{" "}
                <span
                  className="ml-5 text-danger font-weight-bold"
                  style={{ cursor: "pointer" }}
                  onClick={this.handleDelete}
                >
                  X
                </span>
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
      </React.Fragment>
    );
  }
}

export default Address;
