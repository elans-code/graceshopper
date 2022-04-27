import React from "react";
import { connect } from "react-redux";
import { createCar } from "../store/allCarsStore";
import { Link, Redirect } from "react-router-dom";
import { buttons, formInput, formLabel, formLastDiv, forms, formSubDiv, formTitle, maindiv1, maindiv2 } from "../styleClassNames";
import { motion } from "framer-motion";

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
    <Redirect to='/cars' />
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
            <div className={formTitle}>Add Car</div>
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

const mapDispatchToProps = (dispatch, {history}) => ({
    createCar: (car) => dispatch(createCar(car, history)),
  });
  
export default connect(null, mapDispatchToProps)(CreateCar);