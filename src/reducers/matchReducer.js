import {
  CALL_API_PENDING,
  CHANGE_TEXT_SEARCH_MATCH,
  DELETE_MATCH_FULFILLED,
  DELETE_MATCH_REJECTED,
  GET_LIST_MATCHS_FULFILLED,
  GET_LIST_MATCHS_REJECTED,
  GET_MATCH_DETAIL_REJECTED,
  SET_TEAM_WIN_FULFILLED,
  SET_TEAM_WIN_REJECTED,
} from "../constants/actionType";
import { GET_MATCH_DETAIL_FULFILLED } from "./../constants/actionType";

const initialState = {
  isLoading: false,
  listMatch: [],
  matchDetail: null,
  fullTextSearch: "",
};

export const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_API_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_MATCHS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        listMatch: action.payload,
      };
    case GET_LIST_MATCHS_REJECTED:
      return {
        ...state,
        isLoading: false,
        listMatch: [],
      };
    case CHANGE_TEXT_SEARCH_MATCH:
      return {
        ...state,
        isLoading: false,
        fullTextSearch: action.payload,
      };
    case GET_MATCH_DETAIL_FULFILLED:
      return {
        ...state,
        isLoading: false,
        matchDetail: action.payload,
      };
    case GET_MATCH_DETAIL_REJECTED:
      return {
        ...state,
        isLoading: false,
        matchDetail: null,
      };
    case DELETE_MATCH_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_MATCH_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case SET_TEAM_WIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
      };
    case SET_TEAM_WIN_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
