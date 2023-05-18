import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const store = useSelector((state) => state);
  // console.log("store", store);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "TEACHER_LOGOUT" });
    navigate("/");
  };
  return (
    <div className="flex bg-[#FFFFFF] items-center justify-between h-[74px] w-full">
      <div className="flex items-center">
        <h1 className="ml-5 text-lg font-bold text-red-600">
          {" "}
          Học Viện Công Nghệ Bưu Chính Viễn Thông
        </h1>
      </div>
      <div className="flex items-center mx-5 space-x-3">
        <Avatar />
        <h1>{store.auth.teacherData?.retObj?.userDetails?.userFullName}</h1>

        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
