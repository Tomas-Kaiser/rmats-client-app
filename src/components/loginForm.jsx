import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";
import { auth } from "../services/authService";

class LoginForm extends Form {
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
      let { data } = await auth(username, password);
      data = { ...data, pwd: password };
      localStorage.setItem("token", JSON.stringify(data));
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("Something went wrong");
        //return (window.location = "/customer-login");
      } else if (ex.response && ex.response.status === 401) {
        toast.error("Your username or password is incorrect");
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <h1 className="mt-2 mb-4 text-center">Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          <div className="text-center">{this.renderButton("login")}</div>
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
