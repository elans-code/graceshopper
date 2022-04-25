import React from 'react'
import {connect} from 'react-redux'
import { updateCart, addToCart, saveCartToLocal, fetchCart } from "../store/cartStore";

/**
 * COMPONENT
 */
class GlobalCart extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        const {username} = this.props
        if(this.props.isLoggedIn){
            this.props.fetchCarts(state.auth.id)
        }else{
            this.props.fetchCarts()
        }
    }
    componentDidUpdate(prev){
        if(this.props.cart !== prev.cart){
            if(this.props.isLoggedIn){
                this.props.updateDBCart(this.props.cart);
            }else{
                saveCartToLocal(this.props.cart);
            }
        }
    }

    render(){
        return (<></>)
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    cart: state.cart,
    isLoggedIn: !!state.auth.id
  }
}
const mapDispatch = (dispatch) => {
    return {
      getCars: () => dispatch(fetchCars()),
      fetchCarts: (user) => dispatch(fetchCart(user)),
      addedToCart: (item, cart) => dispatch(addToCart(item, cart)),
      updateDBCart: (cart) => dispatch(updateCart(cart)),
    };
  };

export default connect(mapState,mapDispatch)(GlobalCart)
