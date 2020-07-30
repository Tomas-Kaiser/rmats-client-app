import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTicketsByCustomer } from "../../services/ticketService";
import { getReplacementUnitByTicketId } from "./../../services/replacementService";

class CustomerTickets extends Component {
  state = {
    tickets: []
  };

  async componentDidMount() {
    try {
      let updatedTickets = [];

      const { data: tickets } = await getTicketsByCustomer(this.props.user);

      // Adding a replacement unit into ticket based on ticket id
      for (let ticket of tickets) {
        try {
          const { data: replacement } = await getReplacementUnitByTicketId(
            this.props.user,
            ticket.id
          );
          ticket = { ...ticket, replacement };
          updatedTickets.push(ticket);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            alert("Something went wrong");
          }
        }
      }
      this.setState({ tickets: updatedTickets });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="mt-4">Ticket{this.state.tickets === 1 ? "" : "s"}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Ticket Id</th>
              <th scope="col">Date</th>
              <th scope="col">Comment</th>
              <th scope="col"></th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tickets.map(ticket => (
              <tr key={ticket.id}>
                <th scope="row">{ticket.id}</th>
                <td>{ticket.raiseDate}</td>
                <td>{ticket.comment}</td>
                <td>
                  <Link
                    to={`/ticket/${ticket.id}`}
                    className="btn btn-secondary"
                  >
                    Detail
                  </Link>
                </td>
                {ticket.replacement.length !== 0 && (
                  <td>{ticket.replacement[0].status}</td>
                )}
                {ticket.replacement.length === 0 && <td>TBD</td>}
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.tickets.length === 0 && (
          <div className="container text-center">
            <p className="text-info">No tickets created yet.</p>
            <Link to="/customer/ticket/new" className="btn btn-secondary">
              Create Ticket
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CustomerTickets;
