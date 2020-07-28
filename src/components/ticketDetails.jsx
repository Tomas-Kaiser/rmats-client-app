import React, { Component } from "react";
import { getFaultyUnit } from "../services/faultyService";
import { getReplacementUnit } from "../services/replacementService";

class fDetails extends Component {
  state = {
    faulty: [],
    replacement: []
  };

  async componentDidMount() {
    const { user, match } = this.props;
    // Getting the information about the faulty unit
    try {
      const { data: faulty } = await getFaultyUnit(user, match.params.id);
      this.setState({ faulty });
    } catch (error) {
      console.log(error);
    }

    // Getting the information about the replacement unit
    try {
      const { data: replacement } = await getReplacementUnit(
        user,
        match.params.id
      );
      this.setState({ replacement });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>This is a faulty details #{this.props.match.params.id}</h1>
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
            </tr>
          </thead>
          <tbody>
            {this.state.replacement.map(r => (
              <tr key={r.id}>
                <td>{r.model}</td>
                <td>{r.serialNumber}</td>
                <td>{r.carrier}</td>
                <td>{r.trackingNumber}</td>
                <td>{r.comment}</td>
                <td>{r.status}</td>
                <td>{r.processed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default fDetails;
