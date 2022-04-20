import axios from "axios";

// Action types
const SET_SINGLE_USER = "SET_SINGLE_USER";

// Action creators
const setSingleUser = (singleUser) => {
  return {
    type: SET_SINGLE_USER,
    singleUser,
  };
};

// Thunks
export const fetchUser = (id) => {
  return async (dispatch) => {
    const { data } = axios.get(`/api/users/${id}`);
    dispatch(setSingleUser(data));
  };
};

// Reducer
export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.singleUser;
    default:
      return state;
  }
}
