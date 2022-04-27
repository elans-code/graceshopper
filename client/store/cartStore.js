import axios from "axios";
const TOKEN = "token";

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
export const fetchCart = (userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if(!userId){
      dispatch(getCartFromLocal())
    }
    else{
      if(token){
        const { data } = await axios.get(`/api/cart/${userId}`, {
          headers: {
            authorization: token,
          },
        });
        let dbCart = data[0].items
        if(dbCart == null){
          dbCart = [];
        }
        dispatch(_setCart(dbCart));
      }
    }
  };
};

export const updateCart = (cart, userId) => {
  return async (dispatch) => {
    await axios.put(`/api/cart/${userId}`, cart);
    //dispatch(_updateCart(data));
  };
};

export const addToCart = (item, cart, userId) => {
  return async (dispatch) => {
    let alreadyInCart = false
    let newCart = []
    if(cart!==null){
      newCart = cart.map(e=>{
        if(!!e.item){
          if(e.item.id === item.id){
            e.quantity++
            alreadyInCart = true
          }
        }
        return e
      })
    }
    if(!alreadyInCart){
      if(cart === null){
        cart = [];
      }
      cart = [...cart, {item , quantity: 1}];
    }else{
      cart = newCart
    }
    if(userId>0){
      dispatch(updateCart(cart,userId))
    }
    dispatch(_setCart(cart));
  };
};

export const removeFromCart = (item, cart, userId) => {
  return async (dispatch) => {
    let newCart = cart.filter((e)=>{
      if(!!e.item){
        return e.item.id !== item
      }
    })
    if(userId>0){
      dispatch(updateCart(newCart,userId))
      dispatch(_setCart(newCart))
    }else{
      dispatch(_setCart(newCart))
    }
  }
}
export const removeAllFromCart = (cart, userId) => {
  return async (dispatch) => {
    let newCart = cart.filter((e)=>{
      if(!!e.item){
        return e.item.id == -1
      }
    })
    if(userId>0){
      dispatch(updateCart(newCart,userId))
      dispatch(_setCart(newCart))
    }else{
      dispatch(_setCart(newCart))
    }
  }
}

export const modifyCartQuantity = (item,value,cart) =>{
  return (dispatch) =>{
    let newCart = cart.map(cart =>{
      if(cart.item.id === item.id){
        cart.quantity = value
      }
      return cart
    })
    dispatch(_setCart(newCart))
  }
}

export const saveCartToLocal = (cart) => {
  localStorage.setItem('local_cart', JSON.stringify(cart))
}


export const getCartFromLocal = () =>{
  return (dispatch) => {
    const localCart = localStorage.getItem('local_cart')
    const oldCart = JSON.parse(localCart)
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
