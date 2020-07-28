import React, { Component } from "react";
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
        const { data: faulty } = await saveFaultyUnit(user, data, ticket);
        window.location = "/customer/tickets";
      } catch (error) {}
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <h1>Ticket Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("model", "Fault unit (model)")}
          {this.renderInput("serialNumber", "Serial Number")}
          {this.renderInput("custComment", "Comment")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default TicketForm;
