import React from "react";
import { connect } from "react-redux";
import { createCar } from "../store/allCarsStore";
import { Link } from "react-router-dom";

class CreateCar extends React.Component {
  constructor() {
    super();
    this.state = {
      make: "",
      model: "",
      year: "",
      price: "",
      color: "",
      quantity: "",
      description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createCar({ ...this.state});
  }

  render() {
    const { make, model, year, price, color, quantity, description } = this.state;
    return (
      
      <div className="flex justify-center">
        <form onSubmit={this.handleSubmit}>
          
            <label htmlFor="make"> Car Make:</label>
            <input name="make" type='text' onChange={this.handleChange} value={make} />

            <label htmlFor="model">Car Model:</label>
            <input name="model" type='text'  onChange={this.handleChange} value={model} />
          
          
            <label htmlFor="year">Car Year:</label>
            <input name="year" type='text' onChange={this.handleChange} value={year} />
          
          
            <label htmlFor="price">Car Price:</label>
            <input name="price" type='text' onChange={this.handleChange} value={price} />
          
          
            <label htmlFor="color">Car Color:</label>
            <input name="color" type='text' onChange={this.handleChange} value={color} />
          
          
            <label htmlFor="quantity">Car Quantity:</label>
            <input name="quantity" type='text' onChange={this.handleChange} value={quantity} />
          
          
            <label htmlFor="description">Car description:</label>
            <input name="description" type='text' onChange={this.handleChange} value={description} />
          
          
            <button className="btn" type="submit">Submit</button>
            <Link to="/cars" >Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, {history}) => ({
    createCar: (car) => dispatch(createCar(car, history)),
  });
  
export default connect(null, mapDispatchToProps)(CreateCar);