import Axios from "axios";

const SET_USERS = 'SET_USERS'
const CREATE_USER = 'CREATE_USER'

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

export const createUser = (user, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/users", user);
    dispatch(_createUser(created));
    history.push("/");
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get('/api/users');
      const data = response.data;
      dispatch(setUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
};

const initialState = []
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
      case CREATE_USER:
        return [...state, action.user];
    default:
      return state
}}
