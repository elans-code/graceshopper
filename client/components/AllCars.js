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
                    <p>{car.name}</p>
                    <ul>
                      <li>{car.year}</li>
                      <li>{car.make}</li>
                      <li>{car.model}</li>
                      <li>{car.color}</li>
                      <li>{car.description}</li>
                      <li>{car.price}</li>
                      <li>{car.stock}</li>
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
