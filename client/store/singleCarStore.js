import axios from "axios";

// Action Types
const SET_SINGLE_CAR = "SET_SINGLE_CAR"

// Action creators
export const _setSingleCar = (cardata) => {
    return {
        type: SET_SINGLE_CAR,
        cardata
    }
}
//Thunks
export const fetchCar = (id) => {
    return async (dispatch) => {
        const {data} = await axios.get(`/api/cars/${id}`)
        dispatch(_setSingleCar(data))
    }
}
// reducer 
const initialState = [];
const singleCarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CAR:
      return action.cardata
    default:
      return state;
  }
};

export default singleCarReducer;