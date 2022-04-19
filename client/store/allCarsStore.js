import axios from "axios";

// Action Types
const SET_CARS = "SET_CARS"

// Action creators
export const _setCars = (cars) => {
    return {
        type: SET_CARS,
        cars
    }
}

//Thunks
export const fetchCars = () => {
    return async (dispatch) => {
        const {data} = await axios.get("/api/cars")
        dispatch(_setCars(data))
    }
}


// reducer 

const initialState = [];
const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARS:
      return [...action.cars]
    default:
      return state;
  }
};

export default carsReducer;