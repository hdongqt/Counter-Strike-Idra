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
} from "../constants/actionType";

const initialState = {
  isLoading: false,
  formActionUser: {
    isOpenForm: false,
    formData: {
      id: "",
      username: "",
      name: "",
      winRateDefault: "",
    },
    errorMessage: {
      username: "",
      name: "",
      winRateDefault: "",
    },
  },
};

export const userFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_API_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case CHANGE_VALUE_FORM_USER_ACTION:
      const key = Object.keys(action.payload)[0];
      return {
        ...state,
        isLoading: false,
        formActionUser: {
          isOpenForm: true,
          formData: {
            ...state.formActionUser.formData,
            ...action.payload,
          },
          errorMessage: {
            ...state.formActionUser.errorMessage,
            [key]: "",
          },
        },
      };
    case CHANGE_ERROR_ACTION_USER:
      return {
        ...state,
        formActionUser: {
          ...state.formActionUser,
          errorMessage: {
            ...state.formActionUser.errorMessage,
            ...action.payload,
          },
        },
      };
    case OPEN_FORM_CREATE_USER:
      return {
        isLoading: false,
        formActionUser: {
          isOpenForm: true,
          formData: {
            id: "",
            username: "",
            name: "",
            winRateDefault: "",
          },
          errorMessage: {
            username: "",
            name: "",
          },
        },
      };
    case EDIT_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        formActionUser: {
          isOpenForm: false,
          formData: {
            id: "",
            username: "",
            name: "",
          },
          errorMessage: {
            username: "",
            name: "",
          },
        },
      };
    case EDIT_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        formActionUser: {
          isOpenForm: false,
          formData: {
            id: "",
            username: "",
            name: "",
          },
          errorMessage: {
            username: "",
            name: "",
          },
        },
      };
    case CREATE_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case CLEAR_ALL_FORM_USER_ACTION:
      return initialState;
    default:
      return state;
  }
};
