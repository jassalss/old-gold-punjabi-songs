import { USER_CREATED } from "../actions/types";
import { CREATION_ERORR } from "../actions/types";
import { RESET } from "../actions/types";
import { CHECK_SINGED_IN } from "../actions/types";

import { LOG_OUT } from "../actions/types";
import { LOG_OUT_ERROR } from "../actions/types";
const INTIAL_STATE = {
  errorMessage: "",
  isSigned: null,
  userCreated: null,
  userId: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case USER_CREATED:
      return {
        ...state,
        isSigned: true,
        userId: action.payload,
        userCreated: true,
      };
    case CREATION_ERORR:
      return {
        ...state,
        isSigned: null,
        userId: null,
        userCreated: null,
        errorMessage: action.payload,
      };
    case RESET:
      return {
        ...state,
        isSigned: null,
        userId: null,
        userCreated: null,
        errorMessage: "",
      };
    case CHECK_SINGED_IN:
      return {
        ...state,
        isSigned: true,
        userId: action.payload,
        userCreated: true,
        errorMessage: "",
      };
    case LOG_OUT:
      return {
        ...state,
        isSigned: null,
        userId: null,
        userCreated: null,
        errorMessage: "",
      };
    case LOG_OUT_ERROR:
      return {
        ...state,
        isSigned: true,
        userId: true,
        userCreated: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
