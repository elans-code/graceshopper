import React from "react";
import { connect } from "react-redux";
import { fetchUsers, removeUser } from "../store/allUsersStore";
import { Link } from "react-router-dom";

export class AllUsers extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <div className="container">
        <div></div>
        {this.props.users.map((user) => {
          console.log(user.id)
          return (
            <div className="user" key={user.id}>
              <Link to={`/users/${user.id}`} key={user.id}>
                <div key={user.id}>
                  <h1 className="name">{user.name}</h1>
                  <h2>{user.email}</h2>
                </div>
              </Link>
              <button
                onClick={() => this.props.removedUser(user.id)}
                type="submit"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    removedUser: (id) => dispatch(removeUser(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(AllUsers);
