import React from "react";
import { connect } from "react-redux";
import { fetchUsers} from "../store/allUsersStore";
import { Link } from 'react-router-dom'


export class AllUsers extends React.Component {
  constructor() {
    super();
  }
  componentDidMount(){
    this.props.fetchUsers();
  }
  render() {
    return  (
      <div className="container">
        <div></div>
      {this.props.users.map((user) => {
        return (
          <div className="user" key={user.id}>
        <Link to ={`/users/${user.id}`}key={user.id}>
        <div key={user.id}>
          <div className="name"> UserName: {user.name}
        </div>
        </div>
        </Link>
          </div>
        )
      })}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};



const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),

  };
};

export default connect(mapStateToProps, mapDispatch)(AllUsers);
