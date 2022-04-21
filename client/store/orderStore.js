import axios from "axios";

// Action Types
const SET_ORDERS= "SET_ORDERS"

// Action creators
export const _setOrders = (orders) => {
  return {
      type: SET_ORDERS,
      orders
  }
}

//Thunks
export const fetchOrders = () => {
  return async (dispatch) => {
      const {data} = await axios.get("/api/orders")
      dispatch(_setOrders(data))
  }
}

const initialState = [];
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
      default:
        return state;
      }
    };

    export default orderReducer;
