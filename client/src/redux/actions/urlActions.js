import axios from "axios"
import { GET_ERRORS, SEND_NEW_URL, GET_ALL_URLS } from "./types"

export const newUrl = (payload) => (dispatch) => {
  axios
    .post("/urls/newUrl", payload)
    .then((res) => {
      dispatch({
        type: SEND_NEW_URL,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const getAllUrls = (userId) => (dispatch) => {
  axios
    .post("/urls/", { userId: userId })
    .then((res) => {
      dispatch({
        type: GET_ALL_URLS,
        payload: res.data.allUrls,
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}
