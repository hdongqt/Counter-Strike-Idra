import * as message from "../utils/message";
import { deleteUserAPI, fetchUsersAPI, getUserByIdAPI } from "../api/userAPI";
import {
  CALL_API_PENDING,
  CHANGE_TEXT_SEARCH_USER,
  DELETE_USER_FULFILLED,
  DELETE_USER_REJECTED,
  GET_LIST_USERS_FULFILLED,
  GET_LIST_USERS_REJECTED,
  GET_USER_DETAIL_FULFILLED,
  GET_USER_DETAIL_REJECTED,
  SET_USER_SELECTED,
} from "./../constants/actionType";

export const getUsers = (search) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await fetchUsersAPI(search);
    dispatch({
      type: GET_LIST_USERS_FULFILLED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_LIST_USERS_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const changeSearchUser = (key) => {
  return { type: CHANGE_TEXT_SEARCH_USER, payload: key };
};

export const setUserSelect = (user) => {
  return { type: SET_USER_SELECTED, payload: user };
};

export const getUser = (id) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await getUserByIdAPI(id);
    dispatch({
      type: GET_USER_DETAIL_FULFILLED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_USER_DETAIL_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const { userReducer } = getState();
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await deleteUserAPI(id);
    dispatch({
      type: DELETE_USER_FULFILLED,
      payload: response.data,
    });
    dispatch(getUsers(userReducer.searchMatchText));
    message.success("Delete user successfully !");
  } catch (error) {
    dispatch({ type: DELETE_USER_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const changeTextSearchUser = (key) => {
  return { type: CHANGE_TEXT_SEARCH_USER, payload: key };
};
