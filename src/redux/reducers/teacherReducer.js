import {
  GET_ALL_DEPARTMENT,
  GET_SCORE_COURSE,
  GET_SCORE_TEACHER_KHM,
  GET_TEACHER_BY_ID,
  RESET_SCORECOURSES,
  RESET_SCORES,
  TEACHER_LOGOUT,
  //   GET_TKB,
} from "../actionTypes";

const initialState = {
  teachers: [],
  tkb: [],
  authData: null,
  allDepartment: [],
  scorecourses: [],
  scores: [],
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHER_LOGOUT:
      localStorage.removeItem("teacherUser");
      return { ...state, authData: action?.data };
    case GET_ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: action.payload,
      };

    case GET_TEACHER_BY_ID:
      return {
        ...state,
        teachers: action.payload,
      };
    case GET_SCORE_TEACHER_KHM:
      return {
        ...state,
        scorecourses: action.payload,
      };
    case GET_SCORE_COURSE:
      return {
        ...state,
        scores: action.payload,
      };
    case RESET_SCORES:
      return {
        ...state,
        scores: [],
      };
    default:
      return state;
  }
};

export default teacherReducer;
