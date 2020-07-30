import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllCustomers } from "../../services/customerService";

class ListCustomers extends Component {
  state = {
    customers: []
  };

  async componentDidMount() {
    try {
      const { data: customers } = await getAllCustomers(this.props.user);
      this.setState({ customers });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("This is errorpected error 404");
        //return (window.location = "/customer-login");
      } else if (error.response && error.response.status === 401) {
        toast.error("Your username or password is incorrect");
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <h2 className="mt-2 mb-4">All customers Listed:</h2>
        <div className="d-flex">
          {this.state.customers.map(c => (
            <div className="card mr-3 mb-5" style={{ width: "18rem" }}>
              <div className="card-header">
                {c.firstName} {c.lastName}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{c.email}</li>
                <li className="list-group-item">{c.phoneNumber}</li>
              </ul>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ListCustomers;
