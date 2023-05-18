import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import {
//   getAllStudent,
//   getAllTeacher,
//   getAllAdmin,
//   getAllDepartment,
//   getNotice,
// } from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StudentHome = () => {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(getAllStudent());
  //     dispatch(getAllTeacher());
  //     dispatch(getAllAdmin());
  //     dispatch(getAllDepartment());
  //     dispatch(getNotice());
  //   }, [dispatch]);
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

export default StudentHome;
