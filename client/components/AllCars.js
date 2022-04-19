import React from "react";
import { connect } from "react-redux";
import { fetchCars } from "../store/allCarsStore";
import { Link } from "react-router-dom";

class AllCars extends React.Component {
  componentDidMount() {
    this.props.getCars();
  }

  render() {
    return (
      <div>
        <div>
          {this.props.cars.map((car) => {
            return (
              <div key={car.id}>
                <Link to={`/cars/${car.id}`}>
                  <div>
                    <img src={car.imageUrl} width="225" height="225" />
                    <ul>
                      <li>Model: {car.model}</li>
                      <li>Make: {car.make}</li>
                      <li>Year: {car.year}</li>
                      <li>Price: {car.price}</li>
                      {/* <li>Color: {car.color}</li>
                      <li>Stock: {car.stock}</li>
                      <li>Description:{car.description}</li> */}
                    </ul>
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
    getCars: () => dispatch(fetchCars),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCars);
