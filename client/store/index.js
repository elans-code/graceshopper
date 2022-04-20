import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import carsReducer from './allCarsStore'
import singleCarReducer from './singleCarStore'
import userReducer from './allUsersStore'

const reducer = combineReducers({
   auth,
   cars: carsReducer,
   cardata: singleCarReducer,
   users: userReducer,
   })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
