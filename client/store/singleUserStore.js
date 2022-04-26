import Axios from "axios";

const TOKEN = "token";
const SET_SINGLE_USER = "SET_SINGLE_USER";

const _setSingleUser = (userData) => {
  return {
    type: SET_SINGLE_USER,
    userData,
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data: user } = await Axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_setSingleUser(user));
    }
  };
};

export const editUser = (user) => {
  return async (dispatch, history) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        await Axios.put(`/api/users/update/${user.id}`, user, {
          headers: {
            authorization: token,
          },
        });
        const { data: userData } = await Axios.get(`/api/users/${user.id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_setSingleUser(userData));
        // history.push(`/user/modify/${user.id}`)
      }
    } catch (error) {
      // next(error)
      console.log(error);
    }
  };
};

const initialState = [];
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.userData;
    default:
      return state;
  }
}
