import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  getAllDepartment,
  getAllStudent,
  getAllTeacher,
  getAllUnit,
} from "../../redux/actions/adminActions";

const TeacherHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllUnit());
    dispatch(getAllTeacher());
    dispatch(getAllDepartment());
  }, [dispatch]);

  // const user = JSON.parse(localStorage.getItem("user"));
  // const teachers = useSelector((state) => state.admin.allTeacher);
  // const departments = useSelector((state) => state.admin.allDepartment);
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center ">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
