import { combineReducers } from "redux";
import userInfo from "./userInfo";
import policy from "./policy";

const rootReducer = combineReducers({
  userInfo,
  policy
});

export default rootReducer;