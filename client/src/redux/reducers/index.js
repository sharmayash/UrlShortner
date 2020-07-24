import { combineReducers } from "redux"
import authReducer from "./authReducers"
import urlReducer from "./urlReducers"
import errorReducer from "./errorReducer"

export default combineReducers({
  auth: authReducer,
  urls: urlReducer,
  errors: errorReducer,
})
