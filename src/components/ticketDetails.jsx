import React, { Component } from "react";
import { getFaultyUnit } from "../services/faultyService";
import { getReplacementUnitByTicketId } from "../services/replacementService";
import { Link } from "react-router-dom";
import { isArrayEmpty } from "./../utils/emptyArray";

class faultyDetails extends Component {
  state = {
    faulty: [],
    replacement: [],
    processing: false
  };

  async componentDidMount() {
    const { user, match } = this.props;
    // Getting the information about the faulty unit
    try {
      const { data: faulty } = await getFaultyUnit(user, match.params.ticketId);
      this.setState({ faulty });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }

    // Getting the information about the replacement unit
    try {
      const { data: replacement } = await getReplacementUnitByTicketId(
        user,
        match.params.ticketId
      );
      this.setState({ replacement });
      this.setState({ processing: isArrayEmpty(replacement) });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Something went wrong");
      }
    }
  }

  render() {
    const { user } = this.props;
    const { ticketId } = this.props.match.params;
    const { replacement, processing } = this.state;
    return (
      <React.Fragment>
        <h1>This is a ticket details #{ticketId}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Faulty Model</th>
              <th scope="col">Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.faulty.map(f => (
              <tr key={f.id}>
                <td>{f.model}</td>
                <td>{f.serialNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Replacement Unit</th>
              <th scope="col">Serial Number</th>
              <th scope="col">carrier</th>
              <th scope="col">Tracking Number</th>
              <th scope="col">Comment</th>
              <th scope="col">Status</th>
              <th scope="col">Processed</th>
              {user.isAdmin && <th scope="col"></th>}
            </tr>
          </thead>
          <tbody>
            {replacement.map(r => (
              <tr key={r.replacementId}>
                <td>{r.model}</td>
                <td>{r.newSerialNumber}</td>
                <td>{r.carrier}</td>
                <td>{r.trackingNumber}</td>
                <td>{r.comment}</td>
                <td>{r.status}</td>
                <td>{r.processed}</td>
                {user.isAdmin && (
                  <td>
                    <Link
                      to={`/ticket/${ticketId}/replacement/${r.replacementId}`}
                      className="btn btn-secondary"
                    >
                      Update
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* If there is not replacement unit yet */}
        {processing && (
          <p className="text-info text-center">There is no update yet</p>
        )}

        {processing && user.isAdmin && (
          <div className="text-center">
            <Link
              to={`/ticket/${ticketId}/replacement/new`}
              className="btn btn-secondary"
            >
              Add Replacement Unit
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default faultyDetails;
