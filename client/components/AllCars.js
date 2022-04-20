import React from "react";
import { connect } from "react-redux";
import { fetchCars } from "../store/allCarsStore";
import { Link } from "react-router-dom";
import CreateCar from "./CreateCar";

class AllCars extends React.Component {
  componentDidMount() {
    this.props.getCars();
  }

  addToCart() {
      //add to cart
      //add in this functionality 
  }

  render() {
    return (
      <div>
      {/* if admin, then render the CreateCar component otherwise don't */}
        {/* <div className="create-car">
          <CreateCar />
        </div> */}
        <div >
          {this.props.cars.map((car) => {
            return (
              <div key={car.id} className="all-cars">
                { console.log("car!!", car)}
                <Link to={`/cars/${car.id}`}>
                  <div>
                    <img className="all-cars-img" src={car.imageUrl} width="250" height="250" />
                    <p>{car.make} {car.model} ({car.year})</p>
                    <p>{car.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                  </div>
                    <div>
                     <button className="all-cars-btn" type="submit" onClick={()=> this.addToCart(car)} >Add to cart</button>
                    </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(fetchCars()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCars);
