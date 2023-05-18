// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { SET_ERRORS, UPDATE_STUDENT } from "../../../redux/actionTypes";
// import * as classes from "../../../utils/styles";
// import { Link, useNavigate } from "react-router-dom";
// import FileBase from "react-file-base64";
// import { MenuItem, Select } from "@mui/material";
// import Spinner from "../../../utils/Spinner";
// import {
//   getAllStudent,
//   updateStudent,
// } from "../../../redux/actions/adminActions";

// const UpdateStudent = ({ selectedStudent, value, setValue, closeModal }) => {
//   const dispatch = useDispatch();
//   const store = useSelector((state) => state);
//   const departments = useSelector((state) => state.admin.allDepartment);
//   const units = useSelector((state) => state.admin.allUnit);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({});

//   useEffect(() => {
//     if (Object.keys(store.errors).length !== 0) {
//       setError(store.errors);
//     }
//   }, [store.errors]);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   setError({});
//   //   setLoading(true);
//   //   if (
//   //     value.id === "" &&
//   //     value.maSv === "" &&
//   //     value.ho === "" &&
//   //     value.ten === "" &&
//   //     value.phai === "" &&
//   //     value.ngaySinh === "" &&
//   //     value.noiSinh === "" &&
//   //     value.diaChi === "" &&
//   //     value.trangThai === "" &&
//   //     value.sdt === "" &&
//   //     value.email === "" &&
//   //     value.maLop === "" &&
//   //     value.maKhoa === "" &&
//   //     value.hinhAnh === ""
//   //   ) {
//   //     alert("Enter atleast one value");
//   //     setLoading(false);
//   //   } else {
//   //     dispatch(updateStudent(value));
//   //     alert("Kindly login again to see updates");
//   //   }
//   // };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (!value.tenKhoa && !value.sdt) {
//       alert("Enter at least one value");
//     } else {
//       const updatedValue = {};
//       if (value.ho !== "") {
//         updatedValue.ho = value.ho;
//       } else {
//         updatedValue.ho = selectedStudent.ho;
//       }
//       if (value.ten !== "") {
//         updatedValue.ten = value.ten;
//       } else {
//         updatedValue.ten = selectedStudent.ten;
//       }
//       if (value.phai !== "") {
//         updatedValue.phai = value.phai;
//       } else {
//         updatedValue.phai = selectedStudent.phai;
//       }
//       if (value.ngaySinh !== "") {
//         updatedValue.ngaySinh = value.ngaySinh;
//       } else {
//         updatedValue.ngaySinh = selectedStudent.ngaySinh;
//       }
//       if (value.noiSinh !== "") {
//         updatedValue.noiSinh = value.noiSinh;
//       } else {
//         updatedValue.noiSinh = selectedStudent.noiSinh;
//       }
//       if (value.diaChi !== "") {
//         updatedValue.diaChi = value.diaChi;
//       } else {
//         updatedValue.diaChi = selectedStudent.diaChi;
//       }
//       if (value.sdt !== "") {
//         updatedValue.sdt = value.sdt;
//       } else {
//         updatedValue.sdt = selectedStudent.sdt;
//       }
//       if (value.maLop !== "") {
//         updatedValue.maLop = value.maLop;
//       } else {
//         updatedValue.maLop = selectedStudent.maLop;
//       }
//       if (value.maKhoa !== "") {
//         updatedValue.maKhoa = value.maKhoa;
//       } else {
//         updatedValue.maKhoa = selectedStudent.maKhoa;
//       }
//       if (value.hinhAnh !== "") {
//         updatedValue.hinhAnh = value.hinhAnh;
//       } else {
//         updatedValue.hinhAnh = selectedStudent.hinhAnh;
//       }
//       dispatch(updateStudent({ ...selectedStudent, ...updatedValue }));
//       dispatch({ type: UPDATE_STUDENT, payload: false });
//     }
//     closeModal();
//   };

//   useEffect(() => {
//     dispatch(getAllStudent());
//   }, [dispatch, store.errors, store.admin.updatedStudent]);

//   useEffect(() => {
//     if (store.errors || store.student.updatedStudent) {
//       setLoading(false);
//     } else {
//       setLoading(true);
//     }
//   }, [store.errors, store.student.updatedStudent]);
//   useEffect(() => {
//     dispatch({ type: SET_ERRORS, payload: {} });
//   }, []);
//   return (
//     <div className="flex-[0.8] mt-3">
//       <div className="space-y-5">
//         <div className="flex items-center justify-between mr-8"></div>
//         <div className=" mr-10 bg-white flex flex-col rounded-xl overflow-y-scroll h-[27rem] ">
//           <form className={classes.adminForm0} onSubmit={handleFormSubmit}>
//             <div className={classes.adminForm1}>
//               <div className={classes.adminForm2l}>
//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Mã Sinh Viên:</h1>
//                   <input
//                     placeholder={selectedStudent.maSv}
//                     disabled
//                     className={classes.adminInput}
//                     type="text"
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}> Họ:</h1>
//                   <input
//                     placeholder={selectedStudent.ho}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.ho}
//                     onChange={(e) => setValue({ ...value, ho: e.target.value })}
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Tên :</h1>
//                   <input
//                     placeholder={selectedStudent.ten}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.ten}
//                     onChange={(e) =>
//                       setValue({ ...value, ten: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Phái :</h1>
//                   <input
//                     placeholder={selectedStudent.phai}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.phai}
//                     onChange={(e) =>
//                       setValue({ ...value, phai: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Ngày Sinh :</h1>
//                   <input
//                     placeholder={selectedStudent.ngaySinh}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.ngaySinh}
//                     onChange={(e) =>
//                       setValue({ ...value, ngaySinh: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Nơi Sinh :</h1>
//                   <input
//                     placeholder={selectedStudent.noiSinh}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.noiSinh}
//                     onChange={(e) =>
//                       setValue({ ...value, noiSinh: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Địa Chỉ :</h1>
//                   <input
//                     placeholder={selectedStudent.diaChi}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.diaChi}
//                     onChange={(e) =>
//                       setValue({ ...value, diaChi: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Số Điện thoại :</h1>
//                   <input
//                     placeholder={selectedStudent.sdt}
//                     className={classes.adminInput}
//                     type="text"
//                     value={value.sdt}
//                     onChange={(e) =>
//                       setValue({ ...value, sdt: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Email :</h1>
//                   <input
//                     placeholder={selectedStudent.result?.email}
//                     disabled
//                     className={classes.adminInput}
//                     type="text"
//                   />
//                 </div>
//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Lớp :</h1>
//                   <Select
//                     required
//                     displayEmpty
//                     sx={{ height: 36 }}
//                     inputProps={{ "aria-label": "Without label" }}
//                     value={value.maLop}
//                     onChange={(e) =>
//                       setValue({ ...value, maLop: e.target.value })
//                     }
//                   >
//                     <MenuItem value="">None</MenuItem>
//                     {units?.map((dp, idx) => (
//                       <MenuItem key={idx} value={dp.maLop}>
//                         {dp.tenLop}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </div>
//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Department :</h1>
//                   <Select
//                     displayEmpty
//                     sx={{ height: 36 }}
//                     inputProps={{ "aria-label": "Without label" }}
//                     value={value.department}
//                     onChange={(e) =>
//                       setValue({ ...value, department: e.target.value })
//                     }
//                   >
//                     <MenuItem value="">None</MenuItem>
//                     {departments?.map((dp, idx) => (
//                       <MenuItem key={idx} value={dp.department}>
//                         {dp.department}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </div>
//                 <div className={classes.adminForm3}>
//                   <h1 className={classes.adminLabel}>Avatar :</h1>
//                   <FileBase
//                     type="file"
//                     multiple={false}
//                     onDone={({ base64 }) =>
//                       setValue({ ...value, avatar: base64 })
//                     }
//                   />
//                 </div>
//               </div>
//               <div className={classes.adminFormButton}>
//                 <button className={classes.adminFormSubmitButton} type="submit">
//                   Submit
//                 </button>
//                 <Link to="/admin/student" className="btn btn-primary">
//                   <button
//                     className={classes.adminFormClearButton}
//                     type="button"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>
//                 </Link>
//               </div>
//             </div>
//             <div className={classes.loadingAndError}>
//               {loading && (
//                 <Spinner
//                   message="Updating"
//                   height={30}
//                   width={150}
//                   color="#111111"
//                   messageColor="blue"
//                 />
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateStudent;
