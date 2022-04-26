import React from "react";
import { connect } from "react-redux";
import { fetchCar, updateSingleCar } from "../store/singleCarStore";
import { updateCar } from "../store/allCarsStore";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
//not fully complete yet

class EditCar extends React.Component {
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

  componentDidMount() {
    try {
      this.props.fetchCar(this.props.match.params.id);
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.carData !== this.props.carData) {
      this.setState({
        make: this.props.carData.make || "",
        model: this.props.carData.model || "",
        year: this.props.carData.year || "",
        price: this.props.carData.price || "",
        color: this.props.carData.color || "",
        quantity: this.props.carData.quantity || "",
        description: this.props.carData.description || "",
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.updateCar({ ...this.props.carData, ...this.state });
    this.props.updateSingleCar({ ...this.props.carData, ...this.state });
    <Redirect to="/cars"/>
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

const mapStateToProps = (state) => {
  return {
    carData: state.cardata,
  };
};

const mapDispatchToProps = (dispatch, {history}) => ({
  fetchCar: (id) => dispatch(fetchCar(id)),
  // updateCar: (car) => dispatch(updateCar(car, history)),
  updateSingleCar: (car) => dispatch(updateSingleCar(car)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCar);
