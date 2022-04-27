import axios from "axios";

// Action Types
const SET_SINGLE_CAR = "SET_SINGLE_CAR";
const UPDATE_SINGLE_CAR = "UPDATE_SINGLE_CAR";
const TOKEN = "token";

// Action creators
export const _setSingleCar = (cardata) => {
  return {
    type: SET_SINGLE_CAR,
    cardata,
  };
};

const _updateSingleCar = (cardata) => {
  return {
    type: UPDATE_SINGLE_CAR,
    cardata,
  };
};

//Thunks
export const fetchCar = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/cars/${id}`);
    dispatch(_setSingleCar(data));
  };
};

export const updateSingleCar = (car, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        await axios.put(`/api/cars/update/${car.id}`, car, {
          headers: {
            authorization: token,
          },
        });
        const { data: carData } = await axios.get(`/api/cars/${car.id}`);
        dispatch(_setSingleCar(carData));
        history.push(`/cars/${car.id}`)
      }
    } catch (error) {
      next(error)
    }
  };
};

// reducer
const initialState = [];
const singleCarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CAR:
      return action.cardata;
    case UPDATE_SINGLE_CAR:
      return action.cardata;
    default:
      return state;
  }
};

export default singleCarReducer;
