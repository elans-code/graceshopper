import { render } from 'express/lib/response'
import React from 'react'
import {connect} from 'react-redux'

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
        //add car to cart
    }
    render(){
        const cardata = this.props.cardata
        return (
            <div>
                <section><h1>{cardata ? cardata.year : 'Loading year'} {cardata ? cardata.name : 'Loading year'}</h1></section>
                <section><img src= {cardata ? cardata.imageUrl : ''}/></section>
                <section><h2>Make: {cardata ? cardata.make : 'Loading make'}</h2></section>
                <section><h2>Model: {cardata ? cardata.model : 'Loading model'}</h2></section>
                <section><h2>Color: {cardata ? cardata.color : 'Loading color'}</h2></section>
                <section><h2>Price: {cardata ? cardata.price : 'Loading price'}</h2></section>
                <section><h2>Description: {cardata ? cardata.description : 'Loading description'}</h2></section>
                <section><h2>Stock: {cardata ? cardata.stock : 'Loading stock'}</h2></section>
                <section><input type='button' onClick={()=>{this.handleCart(cardata)}}>Add to cart</input></section>
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
        fetchCarData: (id) => { /*dispatch( add thunk for fetch car data )*/ }
    }
}

export default connect(mapState)(SingleCarView)