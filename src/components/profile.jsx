import React, { Component } from "react";

class Profile extends Component {
  state = {};

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <h1 className="mt-2">Profile</h1>
        <div className="card mt-3" style={{ width: "25rem" }}>
          <div className="card-header">
            {user.firstName} {user.lastName}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{user.email}</li>
            <li className="list-group-item">{user.phoneNumber}</li>
            <li className="list-group-item">
              Role: {user.isAdmin ? "Admin" : "Customer"}
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
