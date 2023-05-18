import {
  ADD_DANG_KY_MON,
  GET_ALL_SCORE_STUDENT,
  GET_ALL_UNIT,
  GET_COURSE_BY_SOMETHING,
  GET_STUDENT_BY_ID,
  STUDENT_LOGOUT,
} from "../actionTypes";

const initialState = {
  authData: null,
  allUnit: [],
  dangkymonAdded: false,
  courses: [],
  students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LOGOUT:
      localStorage.removeItem("studentUser");
      return { ...state, authData: action?.data };
    case GET_ALL_UNIT:
      return {
        ...state,
        allUnit: action.payload,
      };
    //  mã lớp với mã kế hoạch á
    case GET_COURSE_BY_SOMETHING:
      return {
        ...state,
        courses: action.payload,
      };
    case ADD_DANG_KY_MON:
      return {
        ...state,
        dangkymonAdded: action.payload,
      };
    case GET_STUDENT_BY_ID:
      return {
        ...state,
        students: action.payload,
      };
    case GET_ALL_SCORE_STUDENT:
      return {
        ...state,
        scores: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
