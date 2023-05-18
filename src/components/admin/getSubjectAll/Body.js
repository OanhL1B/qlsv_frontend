// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   deleteSubject,
//   getAllSubject,
//   updateSubject,
// } from "../../../redux/actions/adminActions";
// import { DELETE_SUBJECT, UPDATE_SUBJECT } from "../../../redux/actionTypes";
// import ReactModal from "react-modal";
// import * as classes from "../../../utils/styles";
// import Swal from "sweetalert2";

// const modalStyles = {
//   content: {
//     top: "45%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     padding: "0",
//   },
// };

// const Body = () => {
//   const store = useSelector((state) => state);
//   // từ từ xóa dòng này
//   const subjects = useSelector((state) => state.admin.allSubject);
//   //
//   const dispatch = useDispatch();

//   //BEGIN EDIT
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const [value, setValue] = useState({
//     id: "",
//     maMh: "",
//     tenMh: "",
//     soTc: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(getAllSubject());
//   }, [dispatch]);

//   // bấm vào sửa thì chọn khoa, mở modal, set sẵn value 3 cái mặc định đi
//   const handleEditClick = (sub) => {
//     setSelectedSubject(sub);
//     setIsModalOpen(true);
//     setValue({
//       tenMh: "",
//       soTc: "",
//       maMh: sub.maMh,
//       id: sub.id,
//     });
//   };
//   const openModal = () => {
//     setIsModalOpen(true);
//   };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   //modal
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (!value.tenMh && !value.soTc) {
//       alert("Enter at least one value");
//     } else {
//       const updatedValue = {};
//       if (value.tenMh !== "") {
//         updatedValue.tenMh = value.tenMh;
//       } else {
//         updatedValue.tenMh = selectedSubject.tenMh;
//       }
//       if (value.soTc !== "") {
//         updatedValue.soTc = value.soTc;
//       } else {
//         updatedValue.soTc = selectedSubject.soTc;
//       }
//       dispatch(updateSubject({ ...selectedSubject, ...updatedValue }));
//       dispatch({ type: UPDATE_SUBJECT, payload: false });
//     }
//     closeModal();
//   };

//   useEffect(() => {
//     dispatch(getAllSubject());
//   }, [dispatch, store.errors, store.admin.updatedSubject]);

//   //ENDEDIT

//   // hàm xóa
//   // BEGIN DELETE
//   const [checkedValue, setCheckedValue] = useState([]);
//   // check xóa
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     const isChecked = e.target.checked;
//     setCheckedValue((prevState) =>
//       isChecked
//         ? [...prevState, value]
//         : prevState.filter((item) => item !== value)
//     );
//   };
//   // hàm xóa

//   const dltSubject = (e) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteSubject(checkedValue));
//       }
//     });
//   };
//   // câp nhật lại
//   useEffect(() => {
//     if (store.admin.subjectDeleted) {
//       setCheckedValue([]);
//       dispatch(getAllSubject());
//       dispatch({ type: DELETE_SUBJECT, payload: false });
//     }
//   }, [store.admin.subjectDeleted]);
//   return (
//     <div className="flex-[0.8] mt-3 mx-5 item-center">
//       <p className="block text-black ">Danh sách Môn Học</p>

//       <div className="flex mt-4">
//         <Link to="/admin/adddsubject" className="btn btn-primary">
//           <button
//             className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4
//            bg-[#157572] focus:outline-none focus:shadow-outline "
//           >
//             Thêm
//           </button>
//         </Link>
//         {/* <button
//           onClick={dltSubject}
//           className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
//         >
//           Xóa
//         </button> */}
//         {subjects && checkedValue?.length > 0 ? (
//           <button
//             onClick={dltSubject}
//             className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
//           >
//             Xóa
//           </button>
//         ) : (
//           <button
//             onClick={dltSubject}
//             className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4"
//             disabled
//           >
//             Xóa
//           </button>
//         )}
//       </div>

//       <div className="w-full my-8 mt-6">
//         {subjects?.length !== 0 && (
//           <table className="w-full table-auto ">
//             <thead className="bg-[#E1EEEE] items-center">
//               <tr>
//                 <th className="px-4 py-2">Chọn</th>
//                 <th className="px-4 py-2">STT</th>
//                 {/* <th className="px-4 py-2">id</th> */}
//                 <th className="px-4 py-2">Mã Môn Học</th>
//                 <th className="px-4 py-2">Tên Môn Học</th>
//                 <th className="px-4 py-2">Số Tín Chỉ</th>
//                 <th className="px-4 py-2">Hành động</th>
//               </tr>
//             </thead>
//             <tbody className="">
//               {subjects?.map((sub, idx) => (
//                 <tr
//                   className="justify-center item-center hover:bg-[#EEF5F5]"
//                   key={idx}
//                 >
//                   <td className="px-4 py-2 border">
//                     <input
//                       onChange={handleInputChange}
//                       checked={checkedValue.includes(sub.id)}
//                       value={sub.id}
//                       type="checkbox"
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">{idx + 1}</td>
//                   {/* <td className="px-4 py-2 border">{dep.id}</td> */}
//                   <td className="px-4 py-2 border">{sub.maMh}</td>
//                   <td className="px-4 py-2 border">{sub.tenMh}</td>
//                   <td className="px-4 py-2 border">{sub.soTc}</td>
//                   <td
//                     className="items-center justify-center px-4 py-2 mr-0 border"
//                     style={{ display: "flex", justifyContent: "center" }}
//                   >
//                     <button
//                       className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
//                       onClick={() => handleEditClick(sub)}
//                     >
//                       Sửa
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {selectedSubject ? (
//         <ReactModal
//           isOpen={isModalOpen}
//           onRequestClose={openModal}
//           style={modalStyles}
//           ariaHideApp={false}
//         >
//           <div className="flex flex-col bg-white rounded-xl">
//             <form
//               className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
//               onSubmit={handleFormSubmit}
//             >
//               <div className="grid grid-cols-3 gap-x-10">
//                 <div className={classes.WrapInputLabel}>
//                   <h1 className={classes.LabelStyle}>Mã Môn Học:</h1>
//                   <input
//                     placeholder={selectedSubject?.maMh}
//                     disabled
//                     className={classes.InputStyle}
//                     type="text"
//                     value={value.maMh}
//                   />
//                 </div>

//                 <div className={classes.WrapInputLabel}>
//                   <h1 className={classes.LabelStyle}>Ten Môn Học :</h1>
//                   <input
//                     placeholder={selectedSubject?.tenMh}
//                     className={classes.InputStyle}
//                     type="text"
//                     value={value.tenMh}
//                     onChange={(e) =>
//                       setValue({
//                         ...value,
//                         tenMh: e.target.value,
//                       })
//                     }
//                   />
//                 </div>

//                 <div className={classes.WrapInputLabel}>
//                   <h1 className={classes.LabelStyle}>Số Tín Chỉ :</h1>
//                   <input
//                     placeholder={selectedSubject?.soTc}
//                     className={classes.InputStyle}
//                     type="text"
//                     value={value.soTc}
//                     onChange={(e) =>
//                       setValue({
//                         ...value,
//                         soTc: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className={classes.adminFormButton}>
//                 <button className={classes.adminFormSubmitButton} type="submit">
//                   Lưu
//                 </button>
//                 <Link to="/admin/allsubject" className="btn btn-primary">
//                   <button
//                     className={classes.adminFormClearButton}
//                     type="button"
//                     onClick={closeModal}
//                   >
//                     Thoát
//                   </button>
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </ReactModal>
//       ) : null}
//     </div>
//   );
// };
// export default Body;
