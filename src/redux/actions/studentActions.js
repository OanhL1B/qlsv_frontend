import { toast } from "react-toastify";
import {
  ADD_DANG_KY_MON,
  GET_ALL_SCORE_STUDENT,
  GET_ALL_UNIT,
  GET_COURSE_BY_SOMETHING,
  GET_STUDENT_BY_ID,
  SET_ERRORS,
} from "../actionTypes";
import * as api from "../api/apiStudent";

export const getAllUnit = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUnit();
    console.log("data", data);
    dispatch({ type: GET_ALL_UNIT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAllCoursebysomething = (requestData) => async (dispatch) => {
  try {
    const { data } = await api.getAllCoursebysomething(requestData);

    dispatch({ type: GET_COURSE_BY_SOMETHING, payload: data.retObj });
  } catch (error) {
    // console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const dangKymon = (formData) => async (dispatch) => {
  try {
    const { data } = await api.dangKymon(formData);
    if (data.status === "success") {
      toast.success("Đăng ký môn thành công!");
      dispatch({ type: ADD_DANG_KY_MON, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const getStudentById = (id) => async (dispatch) => {
  try {
    console.log("runing...");
    const { data } = await api.getStudentById(id);
    console.log("data", data);

    dispatch({ type: GET_STUDENT_BY_ID, payload: data });
  } catch (error) {
    console.log("running13");
    console.log(error);
  }
};

export const getScoreStudent = (maSv, maKeHoach) => async (dispatch) => {
  try {
    const { data } = await api.getScoreStudent(maSv, maKeHoach);
    dispatch({ type: GET_ALL_SCORE_STUDENT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
