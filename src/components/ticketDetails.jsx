import React, { Component } from "react";
import { getFaultyUnit } from "../services/faultyService";
import { getReplacementUnitByTicketId } from "../services/replacementService";
import { Link } from "react-router-dom";

class faultyDetails extends Component {
  state = {
    faulty: [],
    replacement: []
  };

  async componentDidMount() {
    const { user, match } = this.props;
    // Getting the information about the faulty unit
    try {
      const { data: faulty } = await getFaultyUnit(user, match.params.ticketId);
      this.setState({ faulty });
    } catch (error) {
      console.log(error);
    }

    // Getting the information about the replacement unit
    try {
      const { data: replacement } = await getReplacementUnitByTicketId(
        user,
        match.params.ticketId
      );
      this.setState({ replacement });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log("PRRROOOOPS: ", this.props);
    const { user } = this.props;
    const { ticketId } = this.props.match.params;
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
            {this.state.replacement.map(r => (
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
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.replacement.length === 0 && user.isAdmin && (
          <Link
            to={`/ticket/${ticketId}/replacement/new`}
            className="btn btn-primary"
          >
            Add Replacement Unit
          </Link>
        )}
      </React.Fragment>
    );
  }
}

export default faultyDetails;
