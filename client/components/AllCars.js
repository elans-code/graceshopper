import React from "react";
import { connect } from "react-redux";
import { fetchCars } from "../store/allCarsStore";
import { updateCart, addToCart, saveCartToLocal, fetchCart } from "../store/cartStore";
import { Link } from "react-router-dom";

class AllCars extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getCars();
  }

  handleClick(car) {
    this.props.addedToCart(car, this.props.cart);
    //this.props.updateToCart(this.props.cart);
  }

  render() {
    return (
      <div>
        {/* if admin, then render the link to CreateCar component otherwise don't */}
        <div>
          <Link to="cars/create">Add New Car</Link>
        </div>
        <div>
          {this.props.cars.map((car) => {
            return (
              <div key={car.id} className="all-cars">
                <Link to={`/cars/${car.id}`}>
                  <div>
                    <img
                      className="all-cars-img"
                      src={car.imageUrl}
                      width="250"
                      height="250"
                    />
                    <p>
                      {car.make} {car.model} ({car.year})
                    </p>
                    <p>
                      {car.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </Link>
                <div>
                  <button
                    className="all-cars-btn"
                    type="submit"
                    onClick={() => this.handleClick(car)}
                  >
                    Add to cart
                  </button>
                </div>
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
    cart: state.cart,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(fetchCars()),
    addedToCart: (item, cart) => dispatch(addToCart(item, cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCars);
