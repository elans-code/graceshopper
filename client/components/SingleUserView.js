import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/singleUserStore";

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
            <img src={cardata.imageUrl} />
            <h2>{user.email}</h2>
            <h3>{user.dateOfBirth}</h3>
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
    userData: state.singleUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUserData: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleUserView);
