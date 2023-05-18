import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "./Body";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUnit } from "../../../redux/actions/studentActions";

const DangKyMon = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUnit());
    // dispatch(getAllTeacher());
    // dispatch(getAllSubject());
    // dispatch(getAllCourseDetail());
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center ">
      <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <Body user={user} />
        </div>
      </div>
    </div>
  );
};

export default DangKyMon;
