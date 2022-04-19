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
    handleQuantity(event){
        const newQuantity = event.target.value
        if(newQuantity>1){

        }

    }
    render(){
        const cartdata = this.props.cartdata
        let cartTotal = 0
        let numberOfItems = 0
        return (
            <div>
                <div><h1>{username ? username : "guest"}'s cart</h1></div>
                <div>
                {
                    cartdata.map((item) =>
                    {
                        cartTotal += item.price
                        numberOfItems += item.quantity
                        return (
                        <div key={item.id}>
                            <div><h2>{item.name}</h2></div>
                            <div><img src={item.imageUrl}/></div>
                            <div><h2>Price: {item.price}</h2></div>
                            <div><h2>Quantity: </h2><input type='number' name={item.id} onChange={this.handleQuantity}>{item.quantity}</input></div>
                            <div><input type='button' onClick={()=>{this.handleRemoveItem(item.id)}}>Remove Item</input></div>
                        </div>
                        )
                    }
                )}
                </div>
                <div><h2>Number of items in cart: {numberOfItems}</h2></div>
                <div><h2>Subtotal: {cartTotal}</h2></div>
                <div><input type='button' onClick={()=>{this.handleCheckout}}>Checkout</input></div>
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