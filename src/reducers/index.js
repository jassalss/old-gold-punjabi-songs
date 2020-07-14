import { combineReducers } from "redux";
import singerNames from "./singerNames";
import authInfo from "./auth";
export default combineReducers({
  singerRelatedData: singerNames,
  authInfo: authInfo,
});
