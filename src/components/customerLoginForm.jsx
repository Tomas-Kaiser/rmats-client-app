import React, { Component } from "react";
import axios from "axios";
import Input from "./common/input";

class CustomerLoginForm extends Component {
  state = {
    account: { username: "", password: "" }
  };

  handleSubmit = async e => {
    this.props.history.push("/");

    const { username, password } = this.state.account;
    e.preventDefault();

    // Call the server
    console.log("Submitted");

    const token = Buffer.from(`${username}:${password}`, "utf8").toString(
      "base64"
    );
    console.log("java", token);

    const response = await axios.get(
      "http://localhost:8080/customer/1/tickets",
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    console.log("java", response);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={account.password}
            label="password"
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default CustomerLoginForm;
