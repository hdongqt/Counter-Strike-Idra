import { combineReducers } from "redux";
import { matchReducer } from "./matchReducer";
import { matchFormReducer } from "./matchFormReducer";
import { userReducer } from "./userReducer";
import { userFormReducer } from "./userFormReducer";

const rootReducer = combineReducers({
  matchReducer: matchReducer,
  matchFormReducer: matchFormReducer,
  userReducer: userReducer,
  userFormReducer: userFormReducer,
});

export default rootReducer;
