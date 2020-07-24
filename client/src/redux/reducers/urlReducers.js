import { SEND_NEW_URL, GET_ALL_URLS } from "../actions/types"

const initialState = {
  allUrls: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_URLS:
      return {
        ...state,
        allUrls: action.payload.reverse(),
      }
    case SEND_NEW_URL:
      return {
        ...state,
        allUrls: [action.payload, ...state.allUrls],
      }
    default:
      return state
  }
}
