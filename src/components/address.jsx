import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllAddresses } from "../services/addressService";
import { deleteAddressById } from "./../services/addressService";

class Address extends Component {
  state = {
    addresses: [],
    processing: false
  };

  isEmpty = addresses => {
    if (addresses.length === 0) {
      this.setState({ processing: true });
      console.log(this.state.processing);
    }
  };

  async componentDidMount() {
    const { user } = this.props;

    const { data: addresses } = await getAllAddresses(user);
    this.setState({ addresses });
    this.isEmpty(addresses);
  }

  handleDelete = async address => {
    const originalAddresses = this.state.addresses;
    const addresses = originalAddresses.filter(a => a.id !== address.id);
    this.setState({ addresses });
    this.isEmpty(addresses);

    try {
      await deleteAddressById(this.props.user, address.id);
    } catch (error) {
      if (error.response && error.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");
    }
  };

  render() {
    console.log("Processing? ", this.state.processing);
    return (
      <React.Fragment>
        {this.state.addresses.length !== 0 && (
          <React.Fragment>
            <ToastContainer />
            <h2 className="mt-3">Your address listed below:</h2>
            <div className="d-sm-flex mt-5">
              {this.state.addresses.map((address, index) => (
                <div
                  key={address.id}
                  className="card mb-5 mr-4"
                  style={{ width: "18rem" }}
                >
                  <div className="card-header text-right font-weight-bold">
                    Address #{index + 1}{" "}
                    <span
                      className="ml-5 text-danger font-weight-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleDelete(address)}
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
        )}
        {this.state.processing && (
          <div className="container text-center mt-4">
            <p className="text-info">No address added yet.</p>
            <Link to="/customer/address/new" className="btn btn-secondary">
              Add Address
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Address;
