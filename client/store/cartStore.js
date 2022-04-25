import axios from "axios";

// Action Types
const SET_CART = "SET_CART";
const UPDATE_CART = "UPDATE_CART";

// Action creators
export const _setCart = (cartdata) => {
  return {
    type: SET_CART,
    cartdata,
  };
};

const _updateCart = (cartdata) => {
  return {
    type: UPDATE_CART,
    cartdata,
  };
};

//Thunks
export const fetchCart = (user) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/cart/${user.id}`);
    dispatch(_setCart(data));
  };
};

export const updateCart = (cart) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/cart/${cart.id}`, cart);
    dispatch(_updateCart(data));
  };
};

export const addToCart = (item, cart) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/cart/${cart.userId}`, item);
    cart.items = [...cart.items, item];
    dispatch(_setCart(cart));
  };
};

// reducer
const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cartdata;
    case UPDATE_CART:
      return action.cartdata;
    default:
      return state;
  }
};

export default cartReducer;
