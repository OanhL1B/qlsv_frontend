import { useEffect } from "react";
import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Body from "./Body";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUnit,
  getStudentById,
} from "../../../redux/actions/studentActions";

const StudentInFo = () => {
  console.log("runing");
  const store = useSelector((state) => state);
  console.log("store", store);
  const idLogin = store.auth.studentData.retObj.userDetails?.idLogin;
  console.log("idlong", idLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("idLogin1", idLogin);
    dispatch(getStudentById(idLogin));
    dispatch(getAllUnit(idLogin));
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

export default StudentInFo;
