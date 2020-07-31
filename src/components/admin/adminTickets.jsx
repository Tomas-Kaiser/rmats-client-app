import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllTickets } from "../../services/ticketService";
import { isArrayEmpty } from "./../../utils/emptyArray";
import ListGroup from "../common/listGroup";
import { getReplacementUnitByTicketId } from "./../../services/replacementService";

class AdminTickets extends Component {
  state = {
    tickets: [],
    processing: false,
    status: ["All Tickets", "Open", "Closed", "New"]
  };

  async componentDidMount() {
    try {
      let updatedTickets = [];

      const { data: tickets } = await getAllTickets(this.props.user);

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
      this.setState({
        processing: this.setState({ processing: isArrayEmpty(tickets) })
      });
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
    console.log("user id???", this.state.tickets);

    let filtered;
    try {
      filtered =
        selectedStatus && !(selectedStatus === "All Tickets")
          ? this.state.tickets.filter(t => {
              if (t.replacement.length === 0) {
                return "New" === selectedStatus;
              } else {
                return (
                  (t.replacement[0].status.toLowerCase().trim() === "delivered"
                    ? "Closed"
                    : "Open") === selectedStatus
                );
              }
            })
          : this.state.tickets;
    } catch (error) {
      console.log(error);
      alert("Not all tickets were updated yet");

      filtered = this.state.tickets;
    }

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
          <h1 className="mt-4">See all tickets</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Ticket Id</th>
                <th scope="col">Date</th>
                <th scope="col">Customer Comment</th>
                <th scope="col">Ship To Information</th>
                <th scope="col"></th>
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
                      to={`/admin/ship-to-info/${ticket.userId}`}
                      className="btn btn-secondary"
                    >
                      Ship To
                    </Link>
                  </td>
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
                  {ticket.replacement.length === 0 && <td>New</td>}
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.processing && (
            <p className="text-center text-info">
              There is no ticket created yet
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default AdminTickets;
