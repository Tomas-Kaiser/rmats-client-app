import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CustomerLoginForm from "./components/customer/customerLoginForm";
import AdminLoginForm from "./components/adminLoginForm";
import Home from "./components/home";
import CustomerDashboard from "./components/customer/customerDashboard";
import CustomerTickets from "./components/customer/customerTickets";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import RegistrationForm from "./components/registertaionForm";
import TicketForm from "./components/ticketForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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
            <Route path="/customer/tickets/new" component={TicketForm}></Route>
            <Route path="/customer/tickets" component={CustomerTickets}></Route>
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
