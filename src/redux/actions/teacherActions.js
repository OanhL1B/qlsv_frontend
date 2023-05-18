import {
  GET_ALL_DEPARTMENT,
  GET_ALL_TKB,
  GET_SCORE_COURSE,
  GET_SCORE_TEACHER_KHM,
  GET_TEACHER_BY_ID,
  SET_ERRORS,
} from "../actionTypes";
import * as api from "../api/apiTeacher";

export const getAllTKB = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllTKB(requestData);
    console.log("data", data.retObj);
    dispatch({ type: GET_ALL_TKB, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const getAllDepartment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDepartment();
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getTeacherById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTeacherById(id);
    dispatch({ type: GET_TEACHER_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getScorebyTeacherKHM = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getScorebyTeacherKHM(requestData);

    dispatch({ type: GET_SCORE_TEACHER_KHM, payload: data.retObj });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getScoreCourse = (course) => async (dispatch) => {
  try {
    const { data } = await api.getScoreCourse(course);
    dispatch({ type: GET_SCORE_COURSE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
