import React from 'react'
import {connect} from 'react-redux'
import { fetchCar } from '../store/singleCarStore'
import { Link } from 'react-router-dom'
import {addToCart} from '../store/cartStore'

/**
 * COMPONENT
 */
class SingleCarView extends React.Component{
    constructor(props){
        super()
        const {username} = props
    }
    componentDidMount(){
        this.props.fetchCarData(this.props.match.params.id)
    }
    handleCart(cardata){
        this.props.addedToCart(cardata, this.props.cart)
    }
    render(){
        const cardata = this.props.cardata
        console.log(cardata)
        return (
            <div>{ cardata ? 
                (<div>
                    <div><h1>{cardata.year} {cardata ? cardata.make : 'Loading make'} {cardata ? cardata.model : 'Loading model'}</h1></div>
                    <div><img src= {cardata.imageUrl}/></div>
                    <div><h2>Year: {cardata.year}</h2></div>
                    <div><h2>Make: {cardata.make}</h2></div>
                    <div><h2>Model: {cardata.model}</h2></div>
                    <div><h2>Color: {cardata.color}</h2></div>
                    <div><h2>Price: {cardata.price}</h2></div>
                    <div><h2>Description: {cardata.description}</h2></div>
                    <div><h2>Stock: {cardata.quantity}</h2></div>
                    <div><button type='button' onClick={()=>{this.handleCart(cardata)}}>Add to cart</button></div>
                    <div><Link to={`/cars/edit/${cardata.id}`} >Edit</Link></div>
                </div>)
                : 'There is no car data'
            }
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
    cardata: state.cardata,
    cart: state.cart,
  }
}
const mapDispatch = (dispatch) =>{
    return{
        fetchCarData: (id) => { dispatch(fetchCar(id)) },
        addedToCart: (item, cart) => dispatch(addToCart(item, cart)),
    }
}

export default connect(mapState, mapDispatch)(SingleCarView)