import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Checkout extends React.Component {
  constructor() {
    super();
  }




  render() {
    return (
      <div>
      YOUR CAR HAS BEEN PURCHASED
        </div>
        )
  }
}

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
