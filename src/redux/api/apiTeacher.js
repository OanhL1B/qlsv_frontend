import axios from "axios";

const APIV2 = axios.create({ baseURL: "http://localhost:9090/" });

APIV2.interceptors.request.use((req) => {
  if (localStorage.getItem("teacherUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("teacherUser")).retObj.jwt
    }`;
  }
  return req;
});

const magv = JSON.parse(localStorage.getItem("teacherUser"))?.retObj
  ?.userDetails?.username;
// thời khóa biểu
export const getAllTKB = (requestData) =>
  APIV2.post("/api/admin/giangVien/tkb", requestData);
export const teacherUpw = (updatePassword) =>
  APIV2.put("/api/admin/updatePassword", updatePassword);
export const getTeacherById = (id) =>
  APIV2.get(`/api/admin/giangVien/${id}`, id);
export const getAllDepartment = () => APIV2.get("/api/admin/khoa");
// export const getScorebyTeacherKHM = (data) =>
//   APIV2.get(`api/admin/dsLopTc/giangVien/${magv}`, { params: data });
export const getScorebyTeacherKHM = (maKeHoach) =>
  APIV2.post(`api/admin/dsLopTc/giangVien/${magv}?maKeHoach=${maKeHoach}`);
export const getScoreCourse = (course) =>
  APIV2.get(`api/admin/diem/lopTc/detail/${course}`, course);
