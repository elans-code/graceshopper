import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllCars from "./components/AllCars";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleCarView from "./components/SingleCarView";
import Registration from "./components/Registration";
import AllUsers from "./components/AllUsers";
import SingleUserView from "./components/SingleUserView";
import ModifyUser from "./components/ModifyUser";
import Cart from "./components/Cart";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, userId } = this.props;
    // userId ? console.log(userId) : console.log('no userid')
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={AllCars} />
            <Route exact path="/cars" component={AllCars} />
            <Route exact path="/cars/:id" component={SingleCarView} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/users/:id" component={SingleUserView} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={AllCars} />
            <Route exact path="/login" component={Login} />
            {/* <Route path="/signup" component={Signup} /> */}
            <Route exact path="/signup" component={Registration} />
            <Route exact path="/cars" component={AllCars} />
            <Route exact path="/cars/:id" component={SingleCarView} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/users/:id" component={SingleUserView} />
            <Route exact path="/cart" component={Cart} />

            <Route exact path="/user/modify/:id" component={ModifyUser} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
