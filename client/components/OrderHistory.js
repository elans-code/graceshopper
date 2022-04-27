import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../store/orderStore";
import { Link } from "react-router-dom";


class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getOrders(this.props.match.params.id);
    // console.log("ORDERS!!",this.props.orders)
  }



  render() {
    const orders = this.props.orders
    console.log("ORDERS!!!!", orders)
    // return (
    //   <div> { orders ?
    //     (<div> <p>Order: {orders.item} </p>
    //     <p> Price: {orders.price} </p>
    //     </div>) :  'No Previous Orders' }
    //     </div>
    // )
    return (
      <div> { orders ?
        (<div>
          {orders.map((order) => {
            return (
              <div key={order.id} className="all-orders">
                <div> ORDER </div>
                  <div>
                    <p>Number of Cars: {order.quantity}</p>
                     <p>Price: {order.price}</p>
                     <p>Time of Purchase: {order.createdAt}</p>
                    </div>

              </div>
            );
          })}
        </div>) :  'No Previous Orders'
  }
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
    getOrders: (id) => dispatch(fetchOrders(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
