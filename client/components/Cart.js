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
        const {username} = this.props
        username ? this.props.fetchCartData(username) : this.props.fetchCartData('guest')
        this.handleCheckout = this.handleCheckout.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.handleQuantity = this.handleQuantity.bind(this)
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
        const {username} = this.props
        const cartdata = this.props.cart
        let cartTotal = 0
        let numberOfItems = 0
        return (
            <div>
                <div><h1>{username ? username : "guest"}'s cart</h1></div>
                <div>
                { 
                    cartdata ? 
                    cartdata.map
                    ((item) =>
                        {
                            cartTotal += item.price * item.quantity
                            numberOfItems += item.quantity
                            return (
                            <div key={item.id}>
                                <div><h2>{item.name}</h2></div>
                                <div><img src={item.imageUrl}/></div>
                                <div><h2>Price: {item.price}</h2></div>
                                <div><h2>Quantity: </h2><input type='number' value={item.quantity} name={item.id} onChange={this.handleQuantity}/></div>
                                <div><button type='button' onClick={()=>{this.handleRemoveItem(item.id)}}>Remove Item</button></div>
                            </div>
                            )
                        }
                    )
                    : "Theres nothing in the cart"
                }
                </div>
                <div><h2>Number of items in cart: {numberOfItems}</h2></div>
                <div><h2>Subtotal: {cartTotal}</h2></div>
                <div><button type='button' onClick={()=>{this.handleCheckout}}>Checkout</button></div>
            </div>
        )
    };
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    cart: state.cart
  }
}
const mapDispatch = (dispatch) =>{
    return{
        fetchCartData: (username) => { /*dispatch( add thunk for fetch cart data )*/ }
    }
}

export default connect(mapState, mapDispatch)(Cart)