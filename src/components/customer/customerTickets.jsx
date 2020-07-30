import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListGroup from "../common/listGroup";
import { getTicketsByCustomer } from "../../services/ticketService";
import { getReplacementUnitByTicketId } from "./../../services/replacementService";

class CustomerTickets extends Component {
  state = {
    tickets: [],
    status: ["All Tickets", "Open", "Closed"]
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
      console.log("updatedTickets", updatedTickets);
      this.setState({ tickets: updatedTickets });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }
  }

  handleStatusSelect = status => {
    this.setState({ selectedStatus: status });
  };

  render() {
    const { selectedStatus } = this.state;

    console.log("selected STAATUS: ", selectedStatus);

    const filtered =
      selectedStatus && !(selectedStatus === "All Tickets")
        ? this.state.tickets.filter(t => {
            if (t.replacement.length === 0) {
              return "Open" === selectedStatus;
            } else {
              return (
                (t.replacement[0].status.toLowerCase().trim() === "delivered"
                  ? "Closed"
                  : "Open") === selectedStatus
              );
            }
          })
        : this.state.tickets;

    console.log("Filteeeer: ", filtered);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.status}
            selectedItem={this.state.selectedStatus}
            onItemSelect={this.handleStatusSelect}
          />
        </div>
        <div className="col">
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
              {filtered.map(ticket => (
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
                    <td>
                      {ticket.replacement[0].status.toLowerCase().trim() ===
                      "delivered"
                        ? "Closed"
                        : "Open"}
                    </td>
                  )}
                  {ticket.replacement.length === 0 && <td>Open</td>}
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
        </div>
      </div>
    );
  }
}

export default CustomerTickets;
