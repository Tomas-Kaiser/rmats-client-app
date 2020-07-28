import React, { Component } from "react";
import http from "../../services/httpService";
import { getTickets } from "../../services/customerService";

class CustomerTickets extends Component {
  state = {
    tickets: []
  };

  async componentDidMount() {
    try {
      const { data: tickets } = await getTickets(this.props.user);
      this.setState({ tickets });
    } catch (error) {}
  }
  render() {
    return (
      <React.Fragment>
        <h1>See all tickets</h1>
        <table className="table table-striped">
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
