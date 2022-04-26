import React from "react";
import { connect } from "react-redux";
import { fetchCars, deleteCar } from "../store/allCarsStore";
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
    if(!!this.props.auth){
      this.props.addedToCart(car, this.props.cart, this.props.auth);
    }else{
      this.props.addedToCart(car, this.props.cart, -1);
    }
  }

  render() {
    return (
      <div>
        {/* if admin, then render the link to CreateCar component otherwise don't */}
        {console.log("yo!!!!", this.props)}
        {this.props.isAdmin? (
        <div>
          <h2>ADMIN VIEW</h2>
          <Link to="cars/create">Add New Car</Link>
        </div>
        ) : (
          <></>
        )}
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
                {this.props.isAdmin? (
                <div>
                  <button type="submit" onClick={()=> this.props.deleteCar(car.id)}>Remove</button>
                </div>
                ):(<></>)}
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
    isLoggedIn: !!state.auth.id,
    auth: state.auth.id,
    isAdmin: state.auth.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(fetchCars()),
    deleteCar: (car) => dispatch(deleteCar(car, history)),
    addedToCart: (item, cart, userId) => dispatch(addToCart(item, cart, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCars);
