import React, { Component } from "react";
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
      <div>
        <ToastContainer />
        <h1>Address Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("street", "Street")}
          {this.renderInput("zipCode", "Zipe Code")}
          {this.renderInput("city", "City")}
          {this.renderInput("country", "Country")}
          {this.renderButton("save")}
        </form>
      </div>
    );
  }
}

export default AddressForm;
