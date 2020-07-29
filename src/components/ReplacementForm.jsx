import React, { Component } from "react";
import Joi from "joi-browser";
import { ToastContainer } from "react-toastify";
import Form from "./common/form";
import {
  getReplacementUnitById,
  updateReplacementUnit
} from "./../services/replacementService";
import { saveReplacementUnit } from "../services/replacementService";

class ReplacementForm extends Form {
  state = {
    data: {
      model: "",
      carrier: "",
      trackingNumber: "",
      newSerialNumber: "",
      comment: "",
      status: ""
    },
    errors: {}
  };

  schema = {
    model: Joi.string()
      .required()
      .label("Replacement Unit"),
    trackingNumber: Joi.string()
      .required()
      .label("Tracking Number"),
    carrier: Joi.string()
      .required()
      .label("Carrier"),
    newSerialNumber: Joi.string()
      .required()
      .label("Serial Number"),
    comment: Joi.string()
      .required()
      .label("Comment"),
    status: Joi.string()
      .required()
      .label("Status"),
    ticketId: Joi.number()
  };

  async populateReplacementUnit() {
    try {
      console.log("PROPS: ", this.props);
      const replacementId = this.props.match.params.replacementId;
      console.log("replacement id: ", replacementId);
      if (replacementId === "new") return;

      const { data: replacementUnit } = await getReplacementUnitById(
        this.props.user,
        replacementId
      );
      console.log("Data: ", replacementUnit);
      this.setState({ data: this.mapToViewModel(replacementUnit) });
    } catch (error) {
      console.log(error);
    }
  }

  mapToViewModel(replacementUnit) {
    return {
      model: replacementUnit.model,
      carrier: replacementUnit.carrier,
      trackingNumber: replacementUnit.trackingNumber,
      newSerialNumber: replacementUnit.newSerialNumber,
      comment: replacementUnit.comment,
      status: replacementUnit.status
    };
  }

  async componentDidMount() {
    await this.populateReplacementUnit();
  }

  doSubmit = async () => {
    // If new unit otherwise update the replacement unit
    if (this.props.match.params.replacementId === "new") {
      console.log("Submitting: ", this.props);
      try {
        const { data } = await saveReplacementUnit(
          this.props.user,
          this.state.data,
          this.props.match.params.ticketId
        );
        console.log("Saved: ", data);
      } catch (error) {
        console.log(error);
      }
      window.location = "/admin/tickets";
    } else {
      try {
        await updateReplacementUnit(
          this.props.user,
          this.state.data,
          this.props.match.params.ticketId,
          this.props.match.params.replacementId
        );

        window.location = "/admin/tickets";
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <div>
        <ToastContainer />
        <h1>Replacement Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("model", "Replacement Unit")}
          {this.renderInput("newSerialNumber", "Serial Number")}
          {this.renderInput("carrier", "Carrier")}
          {this.renderInput("trackingNumber", "Tracking Number")}
          {this.renderInput("comment", "Comment")}
          {this.renderInput("status", "Status")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReplacementForm;
