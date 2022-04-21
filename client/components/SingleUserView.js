import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/singleUserStore";
import { removeUser } from "../store/allUsersStore";

class SingleUserView extends React.Component {
  componentDidMount() {
    this.props.fetchUserData(this.props.match.params.id);
  }

  render() {
    const user = this.props.userData;
    return (
      <div>
        {user ? (
          <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h3>{user.dateOfBirth}</h3>
            <Link to={`/user/modify/${user.id}`}>Modify {user.name}</Link>
            <button
              onClick={() => this.props.deleteUserData(user.id)}
              type="submit"
            >
              Remove
            </button>
          </div>
        ) : (
          "There is no user data"
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUserData: (id) => dispatch(fetchUser(id)),
    deleteUserData: (id) => dispatch(removeUser(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleUserView);
