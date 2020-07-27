import React, { Component } from "react";
import axios from "axios";

class CustomerTickets extends Component {
  state = {
    tickets: []
  };

  async componentDidMount() {
    const token = Buffer.from(`kosak@c.cz:kosak`, "utf8").toString("base64");

    const { data: tickets } = await axios.get(
      "http://localhost:8080/customers/1/tickets",
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    this.setState({ tickets });
  }
  render() {
    return (
      <React.Fragment>
        <h1>See all tickets</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Ticket Id</th>
              <th scope="col">Date</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tickets.map(ticket => (
              <tr key={ticket.id}>
                <th scope="row">{ticket.id}</th>
                <td>{ticket.raiseDate}</td>
                <td>{ticket.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default CustomerTickets;
