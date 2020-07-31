import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllAddresses } from "../services/addressService";
import { deleteAddressById } from "./../services/addressService";
import { isArrayEmpty } from "./../utils/emptyArray";

class Address extends Component {
  state = {
    addresses: [],
    processing: false
  };

  // if addresses are empty then display info and btn to add address
  isArrayEmpty = addresses => {
    if (addresses.length === 0) {
      this.setState({ processing: true });
    }
  };

  async componentDidMount() {
    const { user } = this.props;
    console.log("Address user:", user);

    const { data: addresses } = await getAllAddresses(user);
    this.setState({ addresses });
    this.setState({ processing: isArrayEmpty(addresses) });
  }

  handleDelete = async address => {
    const originalAddresses = this.state.addresses;
    const addresses = originalAddresses.filter(a => a.id !== address.id);
    this.setState({ addresses });
    this.setState({ processing: isArrayEmpty(addresses) });

    try {
      await deleteAddressById(this.props.user, address.id);
    } catch (error) {
      if (error.response && error.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");
    }
  };

  render() {
    const { addresses, processing } = this.state;
    return (
      <React.Fragment>
        {addresses.length !== 0 && (
          <React.Fragment>
            <ToastContainer />
            <h2 className="mt-3">
              Your address{addresses.length === 1 ? "" : "es"} listed below:
            </h2>
            <div className="d-sm-flex mt-5">
              {addresses.map((address, index) => (
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
        {processing && (
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
