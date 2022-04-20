import React from "react";
import { connect } from "react-redux";
import { fetchCar, updateSingleCar } from "../store/singleCarStore";
import { updateCar } from "../store/allCarsStore";

//not fully complete yet

class EditCar extends React.Component {
  constructor() {
    super();
    this.state = {
      make: "",
      model: "",
      year: "",
      price: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    try {
      this.props.fetchCar;
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate() {
    if (prevProps.carData !== this.props.carData) {
      this.setState({
        make: this.props.carData.make || "",
        model: this.props.carData.model || "",
        year: this.props.carData.year || "",
        price: this.props.carData.price || "",
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
    this.props.updateCar({ ...this.props.carData, ...this.state });
    this.props.updateSingleCar({ ...this.props.carData, ...this.state });
  }

  render() {
    const { make, model, year, price } = this.state;
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
            <label htmlFor="price">Car Year:</label>
            <input name="price" onChange={this.handleChange} value={price} />
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

const mapStateToProps = (state) => {
  return {
    carData: state.cardata,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCar: (id) => dispatch(fetchCar(id)),
  updateCar: (car) => dispatch(updateCar(car)),
  updateSingleCar: (car) => dispatch(updateSingleCar(car)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCar);
