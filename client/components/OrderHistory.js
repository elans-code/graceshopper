import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../store/orderStore";
import { Link } from "react-router-dom";


class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrders();
  }



  render() {
    return (
      <div>
          {this.props.orders.map((order) => {
            return (
              <div key={order.id} className="all-orders">
                {/* <Link to={`/orders/${order.id}`}> */}
                  <div>
                    <p>{order.item} {order.price}</p>

                    </div>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
