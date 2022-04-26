import axios from "axios";

// Action Types
const SET_CARS = "SET_CARS";
const CREATE_CAR = "CREATE_CAR";
const DELETE_CAR = "DELETE_CAR";
const UPDATE_CAR = "UPDATE_CAR";
const TOKEN = "token";

// Action creators
export const _setCars = (cars) => {
  return {
    type: SET_CARS,
    cars,
  };
};

const _createCar = (car) => {
  return {
    type: CREATE_CAR,
    car,
  };
};

const _deleteCar = (car) => {
  return {
    type: DELETE_CAR,
    car,
  };
};

const _updateCar = (car) => {
  return {
    type: UPDATE_CAR,
    car,
  };
};

//Thunks
export const fetchCars = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/cars");
    dispatch(_setCars(data));
  };
};

export const createCar = (car, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.post("/api/cars", car, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_createCar(data));
      history.push("./");
    }
  };
};

export const deleteCar = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.delete(`/api/cars/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_deleteCar(data));
    }
  };
};

export const updateCar = (car) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.put(`/api/cars/${car.id}`, car, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_updateCar(data));
    }
  };
};

// reducer

const initialState = [];
const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARS:
      return action.cars;
    case CREATE_CAR:
      return [...state, action.car];
    case DELETE_CAR:
      return state.filter((car) => car.id !== action.car.id);
    case UPDATE_CAR:
      return state.map((car) =>
        car.id === action.car.id ? [...state, action.car] : car
      );
    default:
      return state;
  }
};

export default carsReducer;
