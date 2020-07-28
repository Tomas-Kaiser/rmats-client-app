import React from "react";
import { ToastContainer } from "react-toastify";
import Joi from "joi-browser";
import Form from "../common/form";
import http from "../../services/httpService";
import { apiUrl } from "../../config.json";
import { auth } from "../../services/authService";

class CustomerLoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;

    try {
      const { data } = await auth(username, password);
      localStorage.setItem("token", JSON.stringify(data));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("This is expected error 404");
        //return (window.location = "/customer-login");
      }
    }

    window.location = "/customer/dashboard";
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default CustomerLoginForm;
