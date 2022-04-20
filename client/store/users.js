import Axios from "axios";

const CREATE_USER = 'CREATE_USER'


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

const initialState = []
export default function userReducer(state = initialState, action) {
  switch (action.type) {
      case CREATE_USER:
        return [...state, action.user];
    default:
      return state
}}
