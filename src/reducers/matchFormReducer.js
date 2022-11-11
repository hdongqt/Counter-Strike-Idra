import {
  CHANGE_VALUE_FORM,
  CREATE_MATCH_REJECTED,
  CREATE_MATCH_FULFILLED,
  NEXT_STEP_FORM,
  BACK_STEP_FORM,
  SET_FORM_MATCH_EDIT,
  CANCEL_CREATE_MATCH,
  SET_USER_SELECTED,
  CALL_API_PENDING,
  CHANGE_ERROR_CREATE_MATCH,
  GET_LIST_USERS_FULFILLED,
  GET_LIST_USERS_REJECTED,
  GENERATE_TEAM_TO_MATCH_FULFILLED,
  GENERATE_TEAM_TO_MATCH_REJECTED,
  CHANGE_ERROR_EDIT_MATCH,
  EDIT_MATCH_REJECTED,
  EDIT_MATCH_FULFILLED,
  CLEAR_FORM_EDIT_MATCH,
} from "../constants/actionType";

const initialState = {
  isLoading: false,
  formCreateMatch: {
    stepForm: 1,
    listUserSelect: [],
    formData: {
      name: "",
      description: "",
      teamT: [],
      teamCT: [],
    },
    errorMessage: {
      name: "",
      description: "",
      team: "",
    },
    listUser: [],
    teamGenerate: null,
  },
  formEditMatch: {
    formData: {
      id: "",
      name: "",
      description: "",
    },
    errorMessage: {
      name: "",
      description: "",
    },
  },
};

export const matchFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_STEP_FORM:
      return {
        ...state,
        formCreateMatch: { ...state.formCreateMatch, stepForm: state.formCreateMatch.stepForm + 1 },
      };
    case BACK_STEP_FORM:
      return {
        ...state,
        formCreateMatch: { ...state.formCreateMatch, stepForm: state.formCreateMatch.stepForm - 1 },
      };
    case CALL_API_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LIST_USERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        formCreateMatch: { ...state.formCreateMatch, listUser: action.payload },
      };
    case GET_LIST_USERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        formCreateMatch: { ...state.formCreateMatch, listUser: [] },
      };
    case SET_USER_SELECTED:
      return {
        ...state,
        isLoading: false,
        formCreateMatch: { ...state.formCreateMatch, listUserSelect: action.payload, teamGenerate: null },
      };
    case GENERATE_TEAM_TO_MATCH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        formCreateMatch: { ...state.formCreateMatch, teamGenerate: action.payload },
      };
    case GENERATE_TEAM_TO_MATCH_REJECTED:
      return {
        ...state,
        isLoading: false,
        formCreateMatch: { ...state.formCreateMatch, teamGenerate: null },
      };
    case CHANGE_ERROR_CREATE_MATCH:
      return {
        ...state,
        formCreateMatch: {
          ...state.formCreateMatch,
          errorMessage: {
            ...state.formCreateMatch.errorMessage,
            ...action.payload,
          },
        },
      };
    case CHANGE_VALUE_FORM:
      const key = Object.keys(action.payload)[0];
      return {
        ...state,
        formCreateMatch: {
          ...state.formCreateMatch,
          formData: {
            ...state.formCreateMatch.formData,
            ...action.payload,
          },
          errorMessage: {
            ...state.formCreateMatch.errorMessage,
            [key]: "",
          },
        },
      };
    case CREATE_MATCH_FULFILLED:
      return initialState;
    case CREATE_MATCH_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case CANCEL_CREATE_MATCH:
      return initialState;
    case SET_FORM_MATCH_EDIT:
      return {
        ...state,
        isLoading: false,
        formEditMatch: { ...state.formEditMatch, formData: action.payload },
      };
    case CHANGE_ERROR_EDIT_MATCH:
      return {
        ...state,
        formEditMatch: {
          ...state.formEditMatch,
          errorMessage: {
            ...state.formEditMatch.errorMessage,
            ...action.payload,
          },
        },
      };
    case EDIT_MATCH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        formEditMatch: initialState.formEditMatch,
      };
    case EDIT_MATCH_REJECTED:
      return {
        ...state,
        isLoading: false,
      };
    case CLEAR_FORM_EDIT_MATCH:
      return {
        ...state,
        formEditMatch: {
          formData: {
            id: "",
            name: "",
            description: "",
          },
          errorMessage: {
            name: "",
            description: "",
          },
        },
      };
    default:
      return state;
  }
};
