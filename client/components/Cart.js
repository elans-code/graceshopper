import { render } from 'express/lib/response'
import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class Cart extends React.Component{
    constructor(props){
        super()
        const {username} = props
    }
    componentDidMount(){
        username ? this.props.fetchCartData(username) : this.props.fetchCartData('guest')
    }
    handleCheckout(cartdata){
        //checkout with payment processor
    }
    handleRemoveItem(itemId){
        //remove item from redux store
    }
    render(){
        const cartdata = this.props.cartdata
        const cartTotal = 0
        return (
            <div>
                <section><h1>{username ? username : "guest"}'s cart</h1></section>
                <section>
                {
                    cartdata.map((item) =>
                    {
                        cartTotal += item.price
                        return (
                        <section key={item.id}>
                            <section><h2>{item.name}</h2></section>
                            <section><img src={item.imageUrl}/></section>
                            <section><h2>Price: {item.price}</h2></section>
                            <section><h2>Quantity: {item.quantity}</h2></section>
                            <section><input type='button' onClick={()=>{this.handleRemoveItem(item.id)}}>Remove Item</input></section>
                        </section>
                        )
                    }
                )}
                </section>
                <section><h2>Subtotal: {cartTotal}</h2></section>
                <section><input type='button' onClick={()=>{this.handleCheckout}}>Checkout</input></section>
            </div>
        )
    };
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}
const mapDispatch = (dispatch) =>{
    return{
        fetchCartData: (username) => { /*dispatch( add thunk for fetch cart data )*/ }
    }
}

export default connect(mapState, mapDispatch)(Cart)