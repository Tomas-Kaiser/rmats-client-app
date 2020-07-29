import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import CustomerTickets from "./components/customer/customerTickets";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import RegistrationForm from "./components/registertaionForm";
import TicketForm from "./components/ticketForm";
import TicketDetails from "./components/ticketDetails";
import AdminTickets from "./components/admin/adminTickets";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    user: {}
  };

  constructor() {
    super();
    const user = JSON.parse(localStorage.getItem("token"));
    this.state.user = user;
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("token"));
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    console.log(user);

    return (
      <React.Fragment>
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegistrationForm}></Route>
            <Route
              path="/dashboard"
              render={props => {
                if (!user) {
                  console.log("is user?", user);
                  return <Redirect to="/login" />;
                }
                return <Dashboard {...props} user={user} />;
              }}
            />
            <Route
              path="/customer/ticket/new"
              render={props => {
                if (!user || user.isAdmin) {
                  return <Redirect to="/login" />;
                }
                return <TicketForm {...props} user={user} />;
              }}
            />
            <Route
              path="/customer/tickets"
              render={props => {
                if (!user || user.isAdmin) {
                  return <Redirect to="/login" />;
                }
                return <CustomerTickets {...props} user={user} />;
              }}
            />
            <Route
              path="/admin/tickets"
              render={props => {
                if (!user || !user.isAdmin) {
                  return <Redirect to="/login" />;
                }
                return <AdminTickets {...props} user={user} />;
              }}
            />
            <Route
              path="/ticket/:id"
              render={props => {
                if (!user) {
                  return <Redirect to="/login" />;
                }
                return <TicketDetails {...props} user={user} />;
              }}
            />
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
