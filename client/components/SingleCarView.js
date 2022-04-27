import React from 'react'
import {connect} from 'react-redux'
import { fetchCar } from '../store/singleCarStore'
import { Link } from 'react-router-dom'
import {addToCart} from '../store/cartStore'
import { buttons } from '../styleClassNames'

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
        return (
            <div className='flex flex-col'>{ cardata ? 
                (<div className='flex flex-col justify-center'>
                    {this.props.isAdmin? <h2>ADMIN VIEW</h2> : <></>}
                    <div className='flex justify-center'><h1>{cardata.year} {cardata ? cardata.make : 'Loading make'} {cardata ? cardata.model : 'Loading model'}</h1></div>
                    <div className='flex justify-center'><img className='w-1/4' src= {cardata.imageUrl}/></div>
                    <div className='flex justify-center'><h2>Year: {cardata.year}</h2></div>
                    <div className='flex justify-center'><h2>Make: {cardata.make}</h2></div>
                    <div className='flex justify-center'><h2>Model: {cardata.model}</h2></div>
                    <div className='flex justify-center'><h2>Color: {cardata.color}</h2></div>
                    <div className='flex justify-center'><h2>Price: {cardata.price}</h2></div>
                    <div className='flex justify-center'><h2 className=''>Description: {cardata.description}</h2></div>
                    <div className='flex justify-center'><h2>Stock: {cardata.quantity}</h2></div>
                    <div className='flex justify-center'><button className={buttons} type='button' onClick={()=>{this.handleCart(cardata)}}>Add to cart</button></div>
                    {this.props.isAdmin? (
                    <div><Link to={`/cars/edit/${cardata.id}`} >Edit</Link></div>
                    ) : (
                        <></>
                    )}
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
    isAdmin: state.auth.admin,
  }
}
const mapDispatch = (dispatch) =>{
    return{
        fetchCarData: (id) => { dispatch(fetchCar(id)) },
        addedToCart: (item, cart) => dispatch(addToCart(item, cart)),
    }
}

export default connect(mapState, mapDispatch)(SingleCarView)