import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CustomerLoginForm from "./components/customer/customerLoginForm";
import AdminLoginForm from "./components/adminLoginForm";
import Home from "./components/home";
import CustomerDashboard from "./components/customer/customerDashboard";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import "./App.css";
import RegistrationForm from "./components/registertaionForm";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log("User: ", user);
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/customer-login" component={CustomerLoginForm}></Route>
            <Route path="/admin-login" component={AdminLoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegistrationForm}></Route>
            <Route
              path="/customer/dashboard"
              component={CustomerDashboard}
            ></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
