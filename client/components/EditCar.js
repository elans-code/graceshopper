import React from "react";
import { connect } from "react-redux";
import { fetchCar, updateSingleCar } from "../store/singleCarStore";
import { updateCar } from "../store/allCarsStore";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttons, formInput, formLabel, formLastDiv, forms, formSubDiv, formTitle, maindiv1, maindiv2 } from "../styleClassNames";

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
  }

  render() {
    const { make, model, year, price, color, quantity, description } = this.state;
    const { name, password, email, dateOfBirth } = this.state;
    const { handleSubmit } = this;
    const randomX = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
    const randomy = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
    const randomDelay = Math.floor(Math.random()*1.5)
    return (
      <motion.div
        initial={{
          opacity: 0,
          x:`${randomX}`,
          y:`${randomy}`,
          scale: 0
        }}
        whileInView={{
          opacity: 1,
          x:0,
          y:0,
          scale: 1
        }}
        transition={{
          delay: randomDelay
        }}
       className={maindiv1}>
          <div className={maindiv2}>
          <div>
            <div className={formTitle}>Modify Vehicle</div>
          </div>
          <form className={forms} onSubmit={this.handleSubmit}>
            <div className={formSubDiv}>
              <label className={formLabel} htmlFor="make"> Car Make:</label>
              <input className={formInput} name="make" type='text' onChange={this.handleChange} value={make} />
            </div>
            <div className={formSubDiv}>
              <label className={formLabel} htmlFor="model">Car Model:</label>
              <input className={formInput} name="model" type='text'  onChange={this.handleChange} value={model} />
            </div>
              <div className={formSubDiv}>  
              <label className={formLabel} htmlFor="year">Car Year:</label>
              <input className={formInput} name="year" type='text' onChange={this.handleChange} value={year} />
            </div>
            <div className={formSubDiv}>
              <label className={formLabel} htmlFor="price">Car Price:</label>
              <input className={formInput} name="price" type='text' onChange={this.handleChange} value={price} />
            </div>
            <div className={formSubDiv}>
              <label className={formLabel} htmlFor="color">Car Color:</label>
              <input className={formInput} name="color" type='text' onChange={this.handleChange} value={color} />
            </div>
            <div className={formSubDiv}>
              <label className={formLabel} htmlFor="quantity">Car Quantity:</label>
              <input className={formInput} name="quantity" type='text' onChange={this.handleChange} value={quantity} />
            </div>
            <div className={formSubDiv}>
              <label className={formLabel} htmlFor="description">Car description:</label>
              <input className={formInput} name="description" type='text' onChange={this.handleChange} value={description} />
            </div>
            <div className={formLastDiv}>
              <button className={buttons} type="submit">Submit</button>
              <Link className={buttons} to="/cars" >Cancel</Link>
            </div>
          </form>
        </div>
      </motion.div>
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
  updateSingleCar: (car) => dispatch(updateSingleCar(car, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCar);
