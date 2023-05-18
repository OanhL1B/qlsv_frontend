import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  getAllCoursebyUnitMKH,
  updateCourse,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import {
  DELETE_COURSE,
  SET_ERRORS,
  UPDATE_COURSE,
} from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import CourseDetail from "../getCourseDetail/CourseDetail";
import Swal from "sweetalert2";

const modalStyles = {
  content: {
    top: "50%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};
// http://localhost:9090/api/admin/dsLopTc?maKeHoach=MKH1&maLop=D19CQCNPM01-N

const Body = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const units = useSelector((state) => state.admin.allUnit);
  const subjects = useSelector((state) => state.admin.allSubject);
  const teachers = useSelector((state) => state.admin.allTeacher);
  const khns = useSelector((state) => state.admin.allKHN);

  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const store = useSelector((state) => state);
  console.log("store", store);
  const [valueUnitMKH, setValueUnitMKH] = useState({
    maKeHoach: "",
    maLop: "",
  });

  // const UnitObj = units?.find((dp) => dp.tenLop === unit);
  // const UnitId = UnitObj?.maLop;

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const UnitObj = units?.find((dp) => dp.tenLop === unit);
    if (!UnitObj) return;
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebyUnitMKH({
        params: {
          ...valueUnitMKH,
          maLop: UnitId,
        },
      })
    );
    // dispatch({ type: "RESET_COURSEDETAILS" });
  };

  const courses = useSelector((state) => state.admin.courses.retObj);

  useEffect(() => {
    if (courses?.length !== 0 || courses?.length === 0) {
      setLoading(false);
    }
  }, [courses]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // BEGIN EDIT
  const [value, setValue] = useState({
    id: "",
    maLopTc: "",
    soLuong: "",
    soLuongCon: "",
    maMh: "",
    maGv: "",
    maLop: "",
    maKeHoach: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setModalMode("edit");
    setValue({
      id: course.id,
      maLopTc: course.maLopTc,
      soLuong: "",
      // soLuongCon: course.soLuongCon,
      soLuongCon: "",
      maMh: "",
      maGv: "",
      maLop: "",
      maKeHoach: "",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (selectedCourse.soLuong < value.soLuong) {
      if (value.soLuong !== "") {
        updatedValue.soLuongCon =
          selectedCourse.soLuongCon + (value.soLuong - selectedCourse.soLuong);
      } else {
        updatedValue.soLuongCon = selectedCourse.soLuongCon;
      }
    } else if (selectedCourse.soLuong > value.soLuong) {
      if (value.soLuong !== "") {
        updatedValue.soLuongCon =
          selectedCourse.soLuongCon - (selectedCourse.soLuong - value.soLuong);
      } else {
        updatedValue.soLuongCon = selectedCourse.soLuongCon;
      }
    } else {
      updatedValue.soLuongCon = selectedCourse.soLuongCon;
    }

    if (value.nienKhoa !== "") {
      updatedValue.nienKhoa = value.nienKhoa;
    } else {
      updatedValue.nienKhoa = selectedCourse.nienKhoa;
    }

    if (value.soLuong !== "") {
      updatedValue.soLuong = value.soLuong;
    } else {
      updatedValue.soLuong = selectedCourse.soLuong;
    }
    if (value.maMh !== "") {
      updatedValue.maMh = value.maMh;
    } else {
      updatedValue.maMh = selectedCourse.maMh;
    }
    if (value.maGv !== "") {
      updatedValue.maGv = value.maGv;
    } else {
      updatedValue.maGv = selectedCourse.maGv;
    }
    if (value.maLop !== "") {
      updatedValue.maLop = value.maLop;
    } else {
      updatedValue.maLop = selectedCourse.maLop;
    }
    if (value.maKeHoach !== "") {
      updatedValue.maKeHoach = value.maKeHoach;
    } else {
      updatedValue.maKeHoach = selectedCourse.maKeHoach;
    }

    dispatch(updateCourse({ ...selectedCourse, ...updatedValue }));
    dispatch({ type: UPDATE_COURSE, payload: false });
    closeModal();
  };

  useEffect(() => {
    if (!store.admin.updatedCourse) return;
    if (!selectedCourse.maLop) return;
    dispatch(
      getAllCoursebyUnitMKH({
        params: {
          ...valueUnitMKH,
          maLop: selectedCourse?.maLop,
        },
      })
    );
  }, [dispatch, store.admin.updatedCourse]);

  const min = selectedCourse?.soLuong - selectedCourse?.soLuongCon;

  const max = 150;
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  //END EDIT

  //VIEW
  const handleOpenViewModal = (course) => {
    setSelectedCourse(course);
    setModalMode("view");
    setIsModalOpen(true);
  };
  //END VIEW
  // BEGIN DELETE
  const [checkedValue, setCheckedValue] = useState([]);
  // check xóa
  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };
  // hàm xóa

  const dltSubject = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCourse(checkedValue));
      }
    });
  };
  // câp nhật lại
  useEffect(() => {
    if (store.admin.courseDeleted) {
      setCheckedValue([]);
      const UnitObj = units.find((dp) => dp.tenLop === unit);
      const UnitId = UnitObj.maLop;
      dispatch(
        getAllCoursebyUnitMKH({
          params: {
            ...valueUnitMKH,
            maLop: UnitId,
          },
        })
      );
      dispatch({ type: DELETE_COURSE, payload: false });
    }
  }, [store.admin.courseDeleted]);
  // END DELETE

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">Danh sách Lớp Tín chỉ</p>

      <div className="flex mt-4">
        <Link to="/admin/addcourse" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>
        {courses && courses.length > 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(courses && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>

      {/* ô search */}
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <div className="flex mt-2 gap-x-2">
            <div className="flex flex-col">
              <span className="mb-1 text-text2">
                Chọn học kỳ xem lớp tín chỉ:
              </span>

              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 274 }}
                inputProps={{ "aria-label": "Without label" }}
                value={valueUnitMKH.maKeHoach}
                onChange={(e) =>
                  setValueUnitMKH({
                    ...valueUnitMKH,
                    maKeHoach: e.target.value,
                  })
                }
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
              >
                <MenuItem value="">None</MenuItem>
                {khns?.map((khn, idx) => (
                  <MenuItem key={idx} value={khn.maKeHoach}>
                    {`Học kỳ ${khn.ky} - Năm học ${khn.nam}-2024`}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-text2">Lớp</span>

              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 296 }}
                inputProps={{ "aria-label": "Without label" }}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
              >
                <MenuItem value="">None</MenuItem>
                {units?.map((ut, idx) => (
                  <MenuItem key={idx} value={ut.tenLop}>
                    {ut.tenLop}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <button
              className="w-56 mt-auto text-white transition-all duration-200 bg-red-500 rounded-md h-9 hover:scale-105 hover:bg-red-700"
              type="submit"
            >
              Lọc
            </button>
          </div>
        </form>
      </div>

      <div className="w-full">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && courses?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {/* bug không phải tính năng */}
            {courses?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp chưa có Lớp tín chỉ
              </p>
            )}
          </div>

          {search &&
            !loading &&
            // Object.keys(error).length === 0 &&
            courses?.length !== 0 && (
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-2">Chọn</th>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Mã Lớp Tín Chỉ</th>
                    <th className="px-4 py-2">Môn học</th>
                    <th className="px-4 py-2">Giảng viên</th>
                    <th className="px-4 py-2">Số lượng</th>
                    <th className="px-4 py-2">Số lượng còn</th>
                    <th className="px-4 py-2">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {courses &&
                    courses.length > 0 &&
                    courses?.map((course, idx) => (
                      <tr
                        className="justify-center item-center hover:bg-[#EEF5F5]"
                        key={idx}
                      >
                        <td className="px-4 py-2 border">
                          <input
                            onChange={handleInputChange}
                            checked={checkedValue.includes(course.id)}
                            value={course.id}
                            type="checkbox"
                          />
                        </td>
                        <td className="px-4 py-2 border">{idx + 1}</td>
                        <td className="px-4 py-2 border">{course.maLopTc}</td>
                        <td className="px-4 py-2 border">{course.tenMh}</td>
                        <td className="px-4 py-2 border">{course.tenGv}</td>

                        <td className="px-4 py-2 border">{course.soLuong}</td>
                        <td className="px-4 py-2 border">
                          {course.soLuongCon}
                        </td>

                        <td className="px-4 py-2 border">
                          <div className="flex items-center justify-center h-full gap-x-1">
                            {/* <Link to="/admin/courseDetailAll"> */}
                            <button
                              className="whitespace-nowrap   focus:shadow-outline w-full h-full px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                              onClick={() => handleOpenViewModal(course)}
                            >
                              Chi tiết
                            </button>
                            {modalMode === "view" && (
                              <CourseDetail
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                course={selectedCourse}
                              />
                            )}
                            <button
                              className="w-full h-full px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                              onClick={() => handleEditClick(course)}
                            >
                              Sửa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
      {modalMode === "edit" && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className={classes.Form1}>
            <form
              className="w-[1226px] min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              {/* item */}
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã lớp tín chỉ:</h1>
                  <input
                    placeholder={selectedCourse.maLopTc}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số lượng :</h1>
                  <input
                    placeholder={selectedCourse.soLuong}
                    className={classes.InputStyle}
                    type="number"
                    value={value.soLuong}
                    onChange={(e) =>
                      setValue({ ...value, soLuong: e.target.value })
                    }
                  />
                </div> */}
                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số lượng :</h1>
                  <select
                    className={classes.InputStyle}
                    value={value.soLuong}
                    onChange={(e) =>
                      setValue({ ...value, soLuong: e.target.value })
                    }
                  >
                    {numbers.map((item) => (
                      <option key={item} value={item} className="">
                        {item}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số lượng :</h1>
                  <Select
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.soLuong || selectedCourse.soLuong}
                    onChange={(e) =>
                      setValue({ ...value, soLuong: e.target.value })
                    }
                    className={classes.InputStyle}
                    MenuProps={{
                      style: {
                        maxHeight: "400px",
                      },
                    }}
                  >
                    {numbers.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value="Nữ">Nữ</MenuItem> */}
                  </Select>
                </div>
                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số lượng còn:</h1>
                  <input
                    placeholder={selectedCourse.soLuongCon}
                    className={classes.InputStyle}
                    type="number"
                    value={value.soLuongCon}
                    disabled
                  />
                </div> */}

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Môn học :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{
                      height: 36,
                      outline: "none",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.maLop}
                    value={value.maMh || selectedCourse.maMh}
                    onChange={(e) =>
                      setValue({ ...value, maMh: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    {subjects?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maMh}>
                        {dp.tenMh}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Lớp học :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{
                      height: 36,
                      outline: "none",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.maLop}
                    value={value.maLop || selectedCourse.maLop}
                    onChange={(e) =>
                      setValue({ ...value, maLop: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    {units?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maLop}>
                        {dp.tenLop}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giảng viên :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{
                      height: 36,
                      outline: "none",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.maLop}
                    value={value.maGv || selectedCourse.maGv}
                    onChange={(e) =>
                      setValue({ ...value, maGv: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    {teachers?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maGv}>
                        {dp.ho} {dp.ten}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã kế hoạch :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.phai}
                    value={value.maKeHoach || selectedCourse.maKeHoach}
                    onChange={(e) =>
                      setValue({ ...value, maKeHoach: e.target.value })
                    }
                    className={classes.InputStyle}
                    // defaultValue={selectedStudent.phai}
                  >
                    <MenuItem value="MKH0">
                      Học kỳ 1 - Năm học 2022-2023
                    </MenuItem>
                    <MenuItem value="MKH1">
                      Học kỳ 2 - Năm học 2022-2023
                    </MenuItem>
                    <MenuItem value="MKH3">
                      Học kỳ 3 - Năm học 2022-2023
                    </MenuItem>
                  </Select>
                </div> */}
              </div>

              {/* buton */}
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </div>
              {/* ERROR */}
              <div className={classes.loadingAndError}>
                {loading && (
                  <Spinner
                    message="Updating"
                    height={30}
                    width={150}
                    color="#157572"
                    messageColor="#157572"
                  />
                )}
              </div>
            </form>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Body;
