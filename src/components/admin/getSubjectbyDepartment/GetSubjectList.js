import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "./Body";
import { getAllDepartment } from "../../../redux/actions/adminActions";

const GetSubjectList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);
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

export default GetSubjectList;
