import { Routes, Route } from "react-router-dom";
import TeacherHome from "./components/teacher/TeacherHome";
import StudentHome from "./components/student/StudentHome";
import React, { useEffect } from "react";
import Profile from "./components/teacher/profile/Profile";
import Login from "./components/login/Login";
import GetUnitList from "./components/admin/getUnitbyDepartment/GetUnitList";
import GetTKB from "./components/teacher/tkb/GetTKB";
import GetTeacherList from "./components/admin/getTeacherbyDepartment/GetTeacherList";
// import GetSubjectList from "./components/admin/getSubjectAll/GetSubjectList";
import GetStudentList from "./components/admin/getStudentbyclass/GetStudentList";
import GetScoreList from "./components/admin/getScoreCourse/GetScoreList";
import GetDepartmentTeacher from "./components/teacher/getDepartmentTeacher/GetDepartmentTeacher";
import GetDepartmentList from "./components/admin/getDepartmentAll/GetDepartmentList";
import GetCourseList from "./components/admin/getCoursebyUnit/GetCourseList";
import DangKyMon from "./components/student/dangkymon/DangKyMon";
import AdminHome from "./components/admin/AdminHome";
import AddUnit from "./components/admin/addUnit/AddUnit";
import AddTeacher from "./components/admin/addTeacher/AddTeacher";
import AddSubject from "./components/admin/addSubject/AddSubject";
import AddStudent from "./components/admin/addStudent/AddStudent";
import AddDepartment from "./components/admin/addDepartment/AddDepartment";
import AddCourseDetail from "./components/admin/addCourseDetail/AddCourseDetail";
import AddCourse from "./components/admin/addCourse/AddCourse";
import "./index.css";
import ThongKe from "./components/admin/thongke/ThongKe";
import PageNotFound from "./components/pagenotfound/PageNotFound";
import UpdatePassWord from "./components/admin/updatepassword/UpdatePassWord";
import TeacherUpw from "./components/teacher/updatepassword/TeacherUpw";
import StudentUpw from "./components/student/updatepassword/StudentUpw";
import GetSubjectList from "./components/admin/getSubjectbyDepartment/GetSubjectList";
import CourseThongKe from "./components/admin/coursethongke/CourseThongKe";
import GetAllCourseDetail from "./components/admin/getAllCourseDetail/GetAllCourseDetail";
import StudentInFo from "./components/student/studentInfo/StudentInFo";
import Score from "./components/student/score/Score";
import ScoreTeacher from "./components/teacher/scoreTeacher/ScoreTeacher";

const App = () => {
  return (
    <Routes>
      {/* admin */}
      {<Route exact path="/" element={<Login />} />}
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/getdepartmentall" element={<GetDepartmentList />} />
      <Route path="/admin/adddepartment" element={<AddDepartment />} />
      <Route path="/admin/teacher" element={<GetTeacherList />} />
      <Route path="/admin/addteacher" element={<AddTeacher />} />
      <Route path="/admin/allUnit" element={<GetUnitList />} />
      <Route path="/admin/addunit" element={<AddUnit />} />
      <Route path="/admin/student" element={<GetStudentList />} />
      <Route path="/admin/addstudent" element={<AddStudent />} />
      {/* <Route  path="/admin/allsubject" element={<GetSubjectList />} /> */}
      <Route path="/admin/allsubject" element={<GetSubjectList />} />

      <Route path="/admin/adddsubject" element={<AddSubject />} />
      <Route path="/admin/allcourse" element={<GetCourseList />} />
      <Route path="/admin/addcourse" element={<AddCourse />} />
      <Route path="/admin/allscore" element={<GetScoreList />} />
      <Route
        path="/admin/addcoursedetail/:course"
        element={<AddCourseDetail />}
      />
      <Route path="/admin/coursedetail" element={<GetAllCourseDetail />} />

      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>

      {/* Teacher */}
      <Route path="/admin/teacherHome" element={<TeacherHome />} />
      <Route path="/teacher/profile" element={<Profile />} />
      <Route path="/teacher/tkb" element={<GetTKB />} />
      <Route
        path="/teacher/getdepartmentall"
        element={<GetDepartmentTeacher />}
      />
      <Route path="teacher/score" element={<ScoreTeacher />} />

      <Route path="/teacher/updatepassword" element={<TeacherUpw />} />

      {/* student */}
      <Route path="/admin/studentHome" element={<StudentHome />} />
      <Route path="/student/dangkymon" element={<DangKyMon />} />
      <Route path="/student/studentinfo" element={<StudentInFo />} />
      <Route path="student/updatepassword" element={<StudentUpw />} />
      <Route path="student/score" element={<Score />} />

      {/* thống kê */}
      <Route path="/admin/thongke" element={<ThongKe />} />

      <Route path="admin/updatepassword" element={<UpdatePassWord />} />
      <Route path="/admin/thongkedetail/:maLopTc" element={<CourseThongKe />} />
    </Routes>
  );
};

export default App;
