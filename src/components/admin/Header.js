// import React from "react";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";

// const Header = () => {
//   const user = JSON.parse(localStorage.getItem());
//   const nameUser = user.retObj.roles[0];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const logout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, sign out!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         dispatch({ type: "LOGOUT" });
//         navigate("/");
//       }
//     });
//   };
//   return (
//     <div className="flex bg-[#FFFFFF] items-center justify-between  h-[74px] w-full">
//       <div className="flex items-center">
//         <h1 className="ml-5 text-lg font-bold text-red-600">
//           {" "}
//           Học Viện Công Nghệ Bưu Chính Viễn Thông
//         </h1>
//       </div>
//       <div className="flex items-center mx-5 space-x-3">
//         <h1 className="text-[#9ca3af] font-serif">{nameUser.split("_")[1]}</h1>
//         <LogoutIcon
//           onClick={logout}
//           className="transition-all cursor-pointer hover:scale-125 text-[#9ca3af] "
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      // text: "Mọi !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "ADMIN_LOGOUT" });
        navigate("/");
      }
    });
  };
  return (
    <div className="flex bg-[#FFFFFF] items-center justify-between  h-[74px] w-full">
      <div className="flex items-center">
        <h1 className="ml-5 text-lg font-bold text-red-600">
          {" "}
          Học Viện Công Nghệ Bưu Chính Viễn Thông
        </h1>
      </div>
      <div className="flex items-center mx-5 space-x-3">
        <Avatar />
        <h1>{store.auth.adminData.role.split("_")[1]}</h1>
        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
