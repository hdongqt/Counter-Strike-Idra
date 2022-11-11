import * as message from "../utils/message";
import { createMatchAPI, editMatchAPI, generateTeamAPI } from "../api/matchAPI";
import {
  CANCEL_CREATE_MATCH,
  CREATE_MATCH_FULFILLED,
  CREATE_MATCH_REJECTED,
  BACK_STEP_FORM,
  NEXT_STEP_FORM,
  CHANGE_VALUE_FORM,
  CHANGE_ERROR_CREATE_MATCH,
  CALL_API_PENDING,
  GENERATE_TEAM_TO_MATCH_FULFILLED,
  GENERATE_TEAM_TO_MATCH_REJECTED,
  SET_FORM_MATCH_EDIT,
  CHANGE_ERROR_EDIT_MATCH,
  EDIT_MATCH_FULFILLED,
} from "../constants/actionType";
import { getMatchs } from "./matchAction";

export const nextStepForm = () => {
  return { type: NEXT_STEP_FORM };
};

export const backStepForm = () => {
  return { type: BACK_STEP_FORM };
};
export const changeValueForm = (value) => {
  return { type: CHANGE_VALUE_FORM, payload: value };
};

export const changeErrorCreateMatch = (value) => {
  return { type: CHANGE_ERROR_CREATE_MATCH, payload: value };
};

export const cancelCreateMatch = () => {
  return { type: CANCEL_CREATE_MATCH };
};
export const submitcreateMatchAPI = (formCreate, handleCancelCreate) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await createMatchAPI(formCreate);
    dispatch({
      type: CREATE_MATCH_FULFILLED,
      payload: response.data,
    });
    message.success("Create match successfully !");
    handleCancelCreate();
  } catch (error) {
    dispatch({ type: CREATE_MATCH_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};
export const generateTeamAPIFromListUser = (listIdSelect) => async (dispatch) => {
  dispatch({ type: CALL_API_PENDING });
  try {
    const response = await generateTeamAPI(listIdSelect);
    dispatch({
      type: GENERATE_TEAM_TO_MATCH_FULFILLED,
      payload: response.data,
    });
    message.success("Generate team successfully !");
  } catch (error) {
    dispatch({ type: GENERATE_TEAM_TO_MATCH_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const setFormEditMatch = (match) => {
  return { type: SET_FORM_MATCH_EDIT, payload: match };
};

export const changeErrorEditMatch = (value) => {
  return { type: CHANGE_ERROR_EDIT_MATCH, payload: value };
};

export const editMatch = (id, formData) => async (dispatch, getState) => {
  dispatch({ type: CALL_API_PENDING });
  const { matchReducer } = getState();
  try {
    const response = await editMatchAPI(id, formData);
    dispatch({
      type: EDIT_MATCH_FULFILLED,
      payload: response.data,
    });
    dispatch(getMatchs(matchReducer.searchMatchText, ""));
    message.success(" Edit match successfully !");
  } catch (error) {
    dispatch({ type: GENERATE_TEAM_TO_MATCH_REJECTED });
    const messsageError = error.response?.data.error.message || error?.message;
    message.error(messsageError);
  }
};

export const clearFormEditMatch = () => {
  return { type: "CLEAR_FORM_EDIT_MATCH" };
};
