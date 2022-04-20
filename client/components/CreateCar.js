import React from "react";
import { connect } from "react-redux";
import { createCar } from "../store/allCarsStore";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="make"> Car Make:</label>
            <input name="make" onChange={this.handleChange} value={make} />
          </div>
          <div>
            <label htmlFor="model">Car Model:</label>
            <input name="model" onChange={this.handleChange} value={model} />
          </div>
          <div>
            <label htmlFor="year">Car Year:</label>
            <input name="year" onChange={this.handleChange} value={year} />
          </div>
          <div>
            <label htmlFor="price">Car Price:</label>
            <input name="price" onChange={this.handleChange} value={price} />
          </div>
          <div>
            <label htmlFor="color">Car Color:</label>
            <input name="color" onChange={this.handleChange} value={color} />
          </div>
          <div>
            <label htmlFor="quantity">Car Quantity:</label>
            <input name="quantity" onChange={this.handleChange} value={quantity} />
          </div>
          <div>
            <label htmlFor="description">Car description:</label>
            <input name="description" onChange={this.handleChange} value={description} />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    createCar: (car) => dispatch(createCar(car)),
  });
  
export default connect(null, mapDispatchToProps)(CreateCar);