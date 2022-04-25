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
export const fetchCart = (user="guest") => {
  return async (dispatch) => {
    console.log('fetching cart user:',user)
    if(user==='guest'){
      dispatch(getCartFromLocal())
    }
    else{
      const { data } = await axios.get(`/api/cart/${user.id}`);
      dispatch(_setCart(data));
    }
  };
};

export const updateCart = (cart) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/cart/${cart.id}`, cart);
    console.log('data',data)
    dispatch(_updateCart(data));
  };
};

export const addToCart = (item, cart) => {
  return async (dispatch) => {
    let alreadyInCart = false
    let newCart = []
    if(cart!==null){
      newCart = cart.map(e=>{
        console.log(e)
        if(e.id === item.id){
          e.quantity++
          alreadyInCart = true
        }
        return e
      })
    }
    if(!alreadyInCart){
      if(cart === null){
        cart = [];
      }
      cart = [...cart, item];
    }else{
      cart = newCart
    }
    dispatch(_setCart(cart));
  };
};

export const saveCartToLocal = (cart) => {
  localStorage.setItem('local_cart', JSON.stringify(cart))
}


export const getCartFromLocal = () =>{
  return (dispatch) => {
    const localCart = localStorage.getItem('local_cart')
    const oldCart = JSON.parse(localCart)
    console.log('old cart:',oldCart)
    dispatch(_setCart(oldCart))
  }
}

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
