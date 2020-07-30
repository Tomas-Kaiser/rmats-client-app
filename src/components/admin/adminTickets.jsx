import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllTickets } from "../../services/ticketService";

class AdminTickets extends Component {
  state = {
    tickets: [],
    processing: false
  };

  isEmpty = tickets => {
    if (tickets.length === 0) {
      this.setState({ processing: true });
    }
  };

  async componentDidMount() {
    const { data: tickets } = await getAllTickets(this.props.user);
    console.log("All tickets: ", tickets);
    this.setState({ tickets });
    this.isEmpty(tickets);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="mt-4">See all tickets</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Ticket Id</th>
              <th scope="col">Date</th>
              <th scope="col">Customer Comment</th>
              <th scope="col"></th>
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
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.processing && (
          <p className="text-center text-info">
            There is no ticket created yet
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default AdminTickets;
