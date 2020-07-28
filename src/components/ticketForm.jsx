import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { saveTicket } from "../services/ticketService";

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
    const user = JSON.parse(localStorage.getItem("token"));
    const token = Buffer.from(`kosak@c.cz:kosak`, "utf8").toString("base64");

    // Creating a ticket
    try {
      const options = {
        headers: {
          Authorization: `Basic ${token}`
        }
      };

      const { data: ticket } = await saveTicket(
        this.props.user,
        this.state.data
      );
      /*
      const { data: ticket } = await http.post(
        apiUrl + `/customers/${user.id}/ticket`,
        { custComment: this.state.data.custComment },
        options
      );
      */
      console.log("Data from craeting ticket:", { ticket });

      // Creating a fault unit
      try {
        const obj = {
          model: this.state.data.model,
          serialNumber: this.state.data.serialNumber,
          ticketId: ticket.id
        };

        const { data: faulty } = await http.post(
          apiUrl + `/customers/${user.id}/tickets/${ticket.id}/faulty`,
          obj,
          options
        );
        console.log("Faulty unit: ", faulty);
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
