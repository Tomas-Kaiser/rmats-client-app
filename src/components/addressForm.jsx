import React from "react";
import { ToastContainer } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveAddress } from "./../services/addressService";

class AddressForm extends Form {
  state = {
    data: { street: "", zipCode: "", city: "", country: "" },
    errors: {}
  };

  schema = {
    street: Joi.string()
      .required()
      .label("Street"),
    zipCode: Joi.string()
      .required()
      .label("Zip Code"),
    city: Joi.string()
      .required()
      .label("City"),
    country: Joi.string()
      .required()
      .label("Country")
  };

  doSubmit = async () => {
    const { user } = this.props;
    const { data } = this.state;

    try {
      await saveAddress(user, data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("This is expected error 404");
      }
    }

    window.location = "/customer/address";
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <h1 className="mt-2 mb-4 text-center">Add an address</h1>
        <div className="container">
          <form
            onSubmit={this.handleSubmit}
            style={{ width: "18rem" }}
            className="m-auto"
          >
            {this.renderInput("street", "Street")}
            {this.renderInput("zipCode", "Zipe Code")}
            {this.renderInput("city", "City")}
            {this.renderInput("country", "Country")}
            <div className="text-center">{this.renderButton("Save")}</div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default AddressForm;
