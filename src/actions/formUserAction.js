import * as message from "../utils/message";
import {
  CALL_API_PENDING,
  CHANGE_ERROR_ACTION_USER,
  CHANGE_VALUE_FORM_USER_ACTION,
  CLEAR_ALL_FORM_USER_ACTION,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
  EDIT_USER_FULFILLED,
  EDIT_USER_REJECTED,
  OPEN_FORM_CREATE_USER,
} from "./../constants/actionType";
import { createUserAPI, editUserAPI } from "../api/userAPI";
import { getUsers } from "./userAction";

export const changeValueFormUserAction = (value) => {
  return { type: CHANGE_VALUE_FORM_USER_ACTION, payload: value };
};

export const changeErrorFormActionUser = (value) => {
  return { type: CHANGE_ERROR_ACTION_USER, payload: value };
};

export const createUser = (formData) => async (dispatch, getState) => {
  dispatch({ type: CALL_API_PENDING });
  const { userReducer } = getState();
  try {
    const response = await createUserAPI(formData);
    dispatch({
      type: CREATE_USER_FULFILLED,
      payload: response.data,
    });
    dispatch(getUsers(userReducer.searchMatchText));
    message.success("Create User successfully !");
  } catch (error) {
    dispatch({ type: CREATE_USER_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const clearAllFormUserAction = (value) => {
  return { type: CLEAR_ALL_FORM_USER_ACTION };
};

export const openFormCreateUser = () => {
  return { type: OPEN_FORM_CREATE_USER };
};

export const editUser = (id, formData) => async (dispatch, getState) => {
  dispatch({ type: CALL_API_PENDING });
  const { userReducer } = getState();
  try {
    const response = await editUserAPI(id, formData);
    dispatch({
      type: EDIT_USER_FULFILLED,
      payload: response.data,
    });
    dispatch(getUsers(userReducer.searchMatchText));
    message.success("Edit User successfully !");
  } catch (error) {
    dispatch({ type: EDIT_USER_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};
