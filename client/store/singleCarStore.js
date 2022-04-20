import axios from "axios";

// Action Types
const SET_SINGLE_CAR = "SET_SINGLE_CAR"
const UPDATE_SINGLE_CAR = "UPDATE_SINGLE_CAR"

// Action creators
export const _setSingleCar = (cardata) => {
    return {
        type: SET_SINGLE_CAR,
        cardata
    }
}

const _updateSingleCar = (cardata) => {
  return {
    type: UPDATE_SINGLE_CAR,
    cardata,
  };
};

//Thunks
export const fetchCar = (id) => {
    return async (dispatch) => {
        const {data} = await axios.get(`/api/cars/${id}`)
        dispatch(_setSingleCar(data))
    }
}

export const updateSingleCar = (car) => {
  return async (dispatch) => {
    const {data} = await axios.put(`/api/cars/${car.id}`, car)
    dispatch(_updateSingleCar(data))
  }
}

// reducer 
const initialState = [];
const singleCarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CAR:
      return action.cardata
    case UPDATE_SINGLE_CAR:
      return action.cardata
    default:
      return state;
  }
};

export default singleCarReducer;