import * as message from "../utils/message";
import { fetchMatchsAPI, getMatchByIdAPI, deleteMatchAPI, setTeamWinAPI } from "../api/matchAPI";
import {
  CALL_API_PENDING,
  CHANGE_TEXT_SEARCH_MATCH,
  DELETE_MATCH_REJECTED,
  GET_LIST_MATCHS_FULFILLED,
  GET_LIST_MATCHS_REJECTED,
  GET_MATCH_DETAIL_REJECTED,
  SET_TEAM_WIN_FULFILLED,
  SET_TEAM_WIN_REJECTED,
} from "../constants/actionType";
import { GET_MATCH_DETAIL_FULFILLED, DELETE_MATCH_FULFILLED } from "../constants/actionType";

export const getMatchs = (payload) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await fetchMatchsAPI(payload);
    dispatch({
      type: GET_LIST_MATCHS_FULFILLED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_LIST_MATCHS_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const getMatch = (id) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await getMatchByIdAPI(id);
    dispatch({
      type: GET_MATCH_DETAIL_FULFILLED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_MATCH_DETAIL_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const deleteMatch = (id) => async (dispatch, getState) => {
  const { matchReducer } = getState();
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await deleteMatchAPI(id);
    dispatch({
      type: DELETE_MATCH_FULFILLED,
      payload: response.data,
    });
    dispatch(getMatchs(matchReducer.searchMatchText, ""));
    message.success("Delete match successfully !");
  } catch (error) {
    dispatch({ type: DELETE_MATCH_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const changeTextSearchMatch = (key) => {
  return { type: CHANGE_TEXT_SEARCH_MATCH, payload: key };
};

export const setTeamWin = (id, teamWin) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await setTeamWinAPI(id, teamWin);
    dispatch({
      type: SET_TEAM_WIN_FULFILLED,
      payload: response.data,
    });
    dispatch(getMatch(id));
    message.success("Choose team win successfully !");
  } catch (error) {
    dispatch({ type: SET_TEAM_WIN_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};
