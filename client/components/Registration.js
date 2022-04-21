import React, { Component } from "react";
import { createUser } from "../store/allUsersStore";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      dateOfBirth: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createUser({ ...this.state });
    this.setState({
      name: "",
      password: "",
      email: "",
      dateOfBirth: "",
    })
  }

  render() {
    const { name, password, email, dateOfBirth } = this.state;
    const { handleSubmit } = this;

    return (
      <div className="flex justify-center">
        <div className="addUser flex flex-col justify-center">
          <div>
            <div className="actionHeader"> Register User</div>
          </div>
          <form id="addUser-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" value={name} onChange={this.handleChange} />

            <label htmlFor="password">Password:</label>
            <input name="password" type="password"value={password} onChange={this.handleChange} />

            <label htmlFor="email">Email:</label>
            <input name="email" type="email" value={email} onChange={this.handleChange} />

            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input name="dateOfBirth" type="date" value={dateOfBirth} onChange={this.handleChange} />
            
            <button type="submit">Submit</button>
            <Link to="/">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, { history }) => ({
  createUser: (user) => dispatch(createUser(user, history)),
});

export default connect(null, mapDispatchToProps)(Registration);
