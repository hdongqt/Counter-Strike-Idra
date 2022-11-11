import {
  CALL_API_PENDING,
  CHANGE_TEXT_SEARCH_USER,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED,
  GET_LIST_USERS_FULFILLED,
  GET_LIST_USERS_REJECTED,
  GET_USER_DETAIL_FULFILLED,
  GET_USER_DETAIL_REJECTED,
} from "../constants/actionType";

const initialState = {
  isLoading: false,
  listUser: [],
  userDetail: null,
  fullTextSearch: "",
  teamGenerate: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_API_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_USERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listUser: action.payload,
      };
    case GET_LIST_USERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        listUser: [],
      };
    case GET_USER_DETAIL_FULFILLED:
      return {
        ...state,
        isLoading: false,
        userDetail: action.payload,
      };
    case GET_USER_DETAIL_REJECTED:
      return {
        ...state,
        isLoading: false,
        userDetail: null,
      };
    case CHANGE_TEXT_SEARCH_USER:
      return {
        ...state,
        isLoading: false,
        fullTextSearch: action.payload,
      };
    case DELETE_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
