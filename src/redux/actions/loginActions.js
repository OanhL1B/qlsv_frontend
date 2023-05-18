import { toast } from "react-toastify";
import { LOGIN, SET_ERRORS } from "../actionTypes";
import * as api from "../api";

// export const userLogin = (formData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.userLogin(formData);

//     if (data.status === "success") {
//       // dispatch({ type: LOGIN, data });
//       const { roles } = data.retObj;
//       const userRole = roles[0];

//       dispatch({ type: LOGIN, data: { role: userRole } });

//       toast.success("Đăng nhập thành công!");
//       if (data.retObj.roles[0] === "ROLE_SINHVIEN")
//         navigate("/admin/studentHome");
//       else if (data.retObj.roles[0] === "ROLE_ADMIN") navigate("/admin/home");
//       else navigate("/admin/teacherHome");
//     } else {
//       toast.error("Username hoặc Password chưa đúng!");
//     }
//   } catch (error) {
//     dispatch({ type: SET_ERRORS, payload: error.response.data });
//   }

// }

export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);

    if (data.status === "success") {
      const { roles } = data.retObj;
      const userRole = roles[0];

      // Bổ sung trường "role" vào đối tượng dữ liệu người dùng
      const userData = { ...data, role: userRole };
      // console.log("userdataa", userData);

      dispatch({ type: LOGIN, data: userData });
      toast.success("Đăng nhập thành công!");
      if (userRole === "ROLE_SINHVIEN") {
        localStorage.setItem("studentUser", JSON.stringify(userData));
        navigate("/admin/studentHome");
      } else if (userRole === "ROLE_ADMIN") {
        localStorage.setItem("adminUser", JSON.stringify(userData));
        navigate("/admin/home");
      } else {
        localStorage.setItem("teacherUser", JSON.stringify(userData));
        navigate("/admin/teacherHome");
      }
    } else {
      toast.error("Username hoặc Password chưa đúng!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
