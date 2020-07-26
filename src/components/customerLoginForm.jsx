import React, { Component } from "react";
import axios from "axios";
import Joi from "joi-browser";
import Form from "./common/form";

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
    // Call the server
    console.log("Submitted");

    const { username, password } = this.state.data;
    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    console.log("java", token);

    try {
      const { data } = await axios.get("http://localhost:8080/customer/auth", {
        headers: {
          Authorization: `Basic ${token}`
        }
      });
      localStorage.setItem("token", JSON.stringify(data));
    } catch (error) {
      console.log("err: ", error);
      return this.props.history.push("/customer-login");
    }
    window.location = "/customer/dashboard";
  };

  render() {
    return (
      <div>
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
