import axios from "axios"
import jwt_decode from "jwt-decode"
import setTokenOnAllRoutes from "../../utils/setTokenOnAllRoutes"
import { GET_ERRORS, SET_CURRENT_USER } from "./types"

// register user

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then(() => {
      history.push("/")
    })
    .then(() => {
      const loginDetail = {
        email: userData.email,
        password: userData.password,
      }

      axios
        .post("/api/users/login", loginDetail)
        .then((res) => {
          // get token
          const { token } = res.data
          // save token to local storage
          localStorage.setItem("jwtToken", token)
          // set token to Auth header
          setTokenOnAllRoutes(token)
          // decode token to get user data
          const decode = jwt_decode(token)
          //set current user
          dispatch(setCurrentUser(decode))
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          })
        })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

// login user

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // get token
      const { token } = res.data
      // save token to local storage
      localStorage.setItem("jwtToken", token)
      // set token to Auth header
      setTokenOnAllRoutes(token)
      // decode token to get user data
      const decode = jwt_decode(token)
      //set current user
      dispatch(setCurrentUser(decode))
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  }
}

export const logOutUser = () => (dispatch) => {
  //remove token from localstorage
  localStorage.removeItem("jwtToken")
  // remove auth header from every header
  setTokenOnAllRoutes(false)
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
