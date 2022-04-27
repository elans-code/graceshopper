import axios from "axios";

// Action Types
const SET_ORDERS= "SET_ORDERS"
const ADD_ORDERS = "ADD_ORDERS";

// Action creators
export const _setOrders = (orders) => {
  return {
      type: SET_ORDERS,
      orders
  }
}

const _addOrder = (orders) => {
  return {
    type: ADD_ORDERS,
    orders,
  };
};

//Thunks
export const fetchOrders = (id) => {
  return async (dispatch) => {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(_setOrders(data))
  }
}

export const addToOrders = ( item, quantity , price, userId, history) => {
  return async (dispatch) => {
    const car = { item: `${item}`,  quantity, price: price, userId: userId}
    const { data } = await axios.post(`/api/orders/`, car);
    dispatch(_addOrder(data));
    history.push('./checkout')
  };
};

const initialState = [];
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
      default:
        return state;
    case ADD_ORDERS:
          return [...state, action.orders];
      }
    };

    export default orderReducer;
