import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveTicket } from "../services/ticketService";
import { saveFaultyUnit } from "../services/faultyService";

class TicketForm extends Form {
  state = {
    data: {
      model: "",
      serialNumber: "",
      custComment: ""
    },
    errors: {}
  };

  schema = {
    model: Joi.string()
      .required()
      .label("Model"),
    serialNumber: Joi.string()
      .required()
      .label("Serial Number"),
    custComment: Joi.string()
      .required()
      .label("Comment")
  };

  doSubmit = async () => {
    const { user } = this.props;
    const { data } = this.state;

    // Creating a ticket
    try {
      const { data: ticket } = await saveTicket(user, data);

      // Creating a fault unit
      try {
        await saveFaultyUnit(user, data, ticket);
        window.location = "/customer/tickets";
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("Something went wrong");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="mt-2 mb-4 text-center">Create a Ticket</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("model", "Fault unit (model)")}
            {this.renderInput("serialNumber", "Serial Number")}
            {this.renderInput("custComment", "Comment")}
            <div className="text-center">{this.renderButton("Submit")}</div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default TicketForm;
