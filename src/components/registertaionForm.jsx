import React from "react";
import axios from "axios";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/customerService";

class RegistrationForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      phone: "",
      company: "",
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Second Name"),
    phone: Joi.string()
      .required()
      .label("Phone Number"),
    company: Joi.string()
      .required()
      .label("Company"),
    email: Joi.string()
      .required()
      .label("Email")
      .email(),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
      console.log("err: ", error);
      return;
    }

    window.location = "/customer-login";
  };

  render() {
    return (
      <div>
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("phone", "Phone Number")}
          {this.renderInput("company", "Company Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
