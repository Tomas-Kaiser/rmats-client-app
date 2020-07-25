import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CustomerLoginForm from "./components/customerLoginForm";
import AdminLoginForm from "./components/adminLoginForm";
import CustomerRegistrationForm from "./components/customerRegistrationForm";
import Home from "./components/home";
import NotFound from "./components/notFound";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <h1>rMATS</h1>
      <main className="container">
        <Switch>
          <Route path="/customer-login" component={CustomerLoginForm}></Route>
          <Route path="/admin-login" component={AdminLoginForm}></Route>
          <Route path="/register" component={CustomerRegistrationForm}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" exact component={Home}></Route>
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
