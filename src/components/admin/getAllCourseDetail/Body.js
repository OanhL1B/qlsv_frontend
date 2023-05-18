import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseDetail,
  getAllCourseDetailCourse,
  getAllCoursebyMKH,
  getAllCoursebyUnitMKH,
  updateCourseDetail,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import {
  DELETE_COURSEDETAIL,
  SET_ERRORS,
  UPDATE_COURSEDETAIL,
} from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import Swal from "sweetalert2";
// http://localhost:9090/api/admin/diem/lopTc/CNTT01-01
const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};
const Body = () => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState("");
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  // const courses = useSelector((state) => state.admin.allCourse);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  console.log("store", store);
  const units = useSelector((state) => state.admin.allUnit);
  const khns = useSelector((state) => state.admin.allKHN);

  // chức năng mới
  const [valueMKH, setValueMKH] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError({});
    const UnitObj = units?.find((dp) => dp.tenLop === unit);
    if (!UnitObj) return;
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebyMKH({
        params: {
          maKeHoach: valueMKH?.maKeHoach,
          maLop: UnitId,
        },
      })
    );
    console.log("runing");
  }, [valueMKH, unit]);
  const courses = useSelector((state) => state.admin.courses);
  console.log("course", courses);

  useEffect(() => {
    if (courses?.length !== 0) {
      setIsLoading(false);
      console.log("runing");
    }
  }, [courses]);

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
    // const CourseObj = courses?.find((dp) => dp.maLopTc === course);
    // const CourseId = CourseObj?.maLopTc; // cần mã lớp tín chỉ
    console.log("runing");

    dispatch(getAllCourseDetailCourse(course));
  };

  const coursedetails = useSelector(
    (state) => state.admin.coursedetails.retObj
  );
  console.log("coursedetails", coursedetails);

  useEffect(() => {
    if (coursedetails?.length !== 0 || coursedetails?.length === 0) {
      setLoading(false);
    }
  }, [coursedetails]);

  useEffect(() => {
    console.log("runing");

    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  //BEGIN EDIT

  const [value, setValue] = useState({
    id: "",
    tiet: "",
    thu: "",
    soTiet: "",
    phong: "",
    maLopTc: "",
  });
  const [selectedCourseDetail, setSelectedCourseDetail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEditClick = (coursedetail) => {
    setSelectedCourseDetail(coursedetail);
    setIsModalOpen(true);
    setModalMode("edit");
    setValue({
      id: coursedetail.id,
      tiet: "",
      thu: "",
      soTiet: "",
      phong: "",
      maLopTc: coursedetail.maLopTc,
    });
  };

  console.log("error?.message", error?.message);
  // xử lý nếu có lỗi ở trong modal
  // const handleCloseModal = () => {
  //   if (!error?.message && !isSubmitting) {
  //     closeModal();
  //   }
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (value.tiet !== "") {
      updatedValue.tiet = value.tiet;
    } else {
      updatedValue.tiet = selectedCourseDetail.tiet;
    }
    if (value.thu !== "") {
      updatedValue.thu = value.thu;
    } else {
      updatedValue.thu = selectedCourseDetail.thu;
    }
    if (value.soTiet !== "") {
      updatedValue.soTiet = value.soTiet;
    } else {
      updatedValue.soTiet = selectedCourseDetail.soTiet;
    }
    if (value.phong !== "") {
      updatedValue.phong = value.phong;
    } else {
      updatedValue.phong = selectedCourseDetail.phong;
    }

    dispatch(updateCourseDetail({ ...selectedCourseDetail, ...updatedValue }));
    dispatch({ type: UPDATE_COURSEDETAIL, payload: false });
    closeModal();
  };

  useEffect(() => {
    // dispatch(getScoreCourse(setSelectedCourseDetail.maLopTc));
    if (store.admin.updatedCourseDetail) {
      console.log("runing");

      dispatch(getAllCourseDetailCourse(course));
    }
  }, [dispatch, store.errors, store.admin.updatedCourseDetail]);
  //ENDEDIT

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
      title: "Bạn có chắc chắn không?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCourseDetail(checkedValue));
      }
    });
  };

  // câp nhật lại
  useEffect(() => {
    if (store.admin.coursedetailDeleted) {
      setCheckedValue([]);
      console.log("runing");

      // dispatch(getScoreCourse(CourseId));
      dispatch(getAllCourseDetailCourse(course));

      dispatch({ type: DELETE_COURSEDETAIL, payload: false });
    }
  }, [store.admin.coursedetailDeleted]);

  useEffect(() => {
    // dispatch(getStudentUnit(UnitId));
    if (!store.errors) return;
    if (!course) return;
    console.log("runing");

    dispatch(getAllCourseDetailCourse(course));
  }, [store.errors]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">Danh sách chi tiết lớp tín chỉ:</p>

      <div className="flex mt-4">
        {/* {coursedetails && coursedetails?.length !== 0 && (
          
          */}
        {valueMKH !== "" && course !== "" && (
          <Link
            to={`/admin/addcoursedetail/${course}`}
            className="btn btn-primary"
          >
            <button
              className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
            >
              Thêm
            </button>
          </Link>
        )}
        {/* <Link
          to={`/admin/addcoursedetail/${course}`}
          className="btn btn-primary"
        >
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link> */}
        {coursedetails && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(coursedetails && checkedValue?.length > 0)}
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
              <span className="mb-1 text-text2">Chọn học kỳ:</span>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 274 }}
                inputProps={{ "aria-label": "Without label" }}
                value={valueMKH.maKeHoach}
                onChange={(e) =>
                  setValueMKH({ ...valueMKH, maKeHoach: e.target.value })
                }
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none w-[200px] mr-3"
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
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Lớp tín chỉ:</span>

              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 324 }}
                inputProps={{ "aria-label": "Without label" }}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
                SelectDisplayProps={{ sx: { overflow: "auto" } }}
              >
                <MenuItem value="">None</MenuItem>

                {/* {isLoading ? (
                  <MenuItem disabled>Loading...</MenuItem> */}
                {/* ) : */}
                {courses && courses.length > 0 ? (
                  courses.map((ut, idx) => (
                    <MenuItem key={idx} value={ut.maLopTc}>
                      {"Mã LTC: "} {ut.maLopTc} {" - "} {"Môn học: "} {ut.tenMh}{" "}
                      {" - "} {"Giảng viên: "} {ut.tenGv}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No courses found</MenuItem>
                )}
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
            {loading && coursedetails?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {coursedetails?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp tín chỉ chưa có chi tiết lớp tín chỉ
              </p>
            )}
          </div>

          {search && !loading && coursedetails?.length !== 0 && (
            <table className="w-full table-auto">
              <thead className="bg-[#E1EEEE] items-center">
                <tr>
                  <th className="px-4 py-2">Chọn</th>
                  <th className="px-4 py-2">STT</th>
                  <th className="px-4 py-2">Mã lớp tín chỉ</th>
                  <th className="px-4 py-2">Tiết bắt đầu</th>
                  <th className="px-4 py-2">Phòng</th>
                  <th className="px-4 py-2">Số tiết</th>
                  <th className="px-4 py-2">Thứ</th>
                  <th className="px-4 py-2">Hành Động</th>
                </tr>
              </thead>
              <tbody className="">
                {coursedetails?.map((coursedetail, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-2 border">
                      <input
                        onChange={handleInputChange}
                        checked={checkedValue.includes(coursedetail.id)}
                        value={coursedetail.id}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-2 border">{idx + 1}</td>

                    <td className="px-4 py-2 border">{coursedetail.maLopTc}</td>
                    <td className="px-4 py-2 border">{coursedetail.tiet}</td>
                    <td className="px-4 py-2 border">{coursedetail.phong}</td>
                    <td className="px-4 py-2 border">{coursedetail.soTiet}</td>
                    {coursedetail.thu === "01" && (
                      <td className="px-4 py-2 border">Thứ 2</td>
                    )}
                    {coursedetail.thu === "02" && (
                      <td className="px-4 py-2 border">Thứ 3</td>
                    )}
                    {coursedetail.thu === "03" && (
                      <td className="px-4 py-2 border">Thứ 4</td>
                    )}
                    {coursedetail.thu === "04" && (
                      <td className="px-4 py-2 border">Thứ 5</td>
                    )}
                    {coursedetail.thu === "05" && (
                      <td className="px-4 py-2 border">Thứ 6</td>
                    )}
                    {coursedetail.thu === "06" && (
                      <td className="px-4 py-2 border">Thứ 7</td>
                    )}
                    {coursedetail.thu === "07" && (
                      <td className="px-4 py-2 border">Thứ 8</td>
                    )}

                    <td
                      className="items-center justify-center px-4 py-2 mr-0 border"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        className="px-3.5 py-1 font-bold text-white rounded  hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                        onClick={() => handleEditClick(coursedetail)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {selectedCourseDetail ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-3 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã lớp tín chỉ:</h1>
                  <input
                    placeholder={selectedCourseDetail?.maLopTc}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maLopTc}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tiết :</h1>
                  {/* <input
                    placeholder={selectedCourseDetail?.tiet}
                    className={classes.InputStyle}
                    type="number"
                    value={value.tiet}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tiet: e.target.value,
                      })
                    }
                  /> */}
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.phai}
                    value={value.tiet || selectedCourseDetail.tiet}
                    onChange={(e) =>
                      setValue({ ...value, tiet: e.target.value })
                    }
                    className={classes.InputStyle}
                    // defaultValue={selectedStudent.phai}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                  </Select>
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Thứ :</h1>

                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.phai}
                    value={value.thu || selectedCourseDetail.thu}
                    onChange={(e) =>
                      setValue({ ...value, thu: e.target.value })
                    }
                    className={classes.InputStyle}
                    // defaultValue={selectedStudent.phai}
                  >
                    <MenuItem value="01">Thứ 2</MenuItem>
                    <MenuItem value="02">Thứ 3</MenuItem>
                    <MenuItem value="03">Thứ 4</MenuItem>
                    <MenuItem value="04">Thứ 5</MenuItem>
                    <MenuItem value="05">Thứ 6</MenuItem>
                    <MenuItem value="06">Thứ 7</MenuItem>
                    <MenuItem value="07">Chủ Nhật</MenuItem>
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tiết :</h1>

                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.phai}
                    value={value.soTiet || selectedCourseDetail.soTiet}
                    onChange={(e) =>
                      setValue({ ...value, soTiet: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Phòng :</h1>
                  <input
                    placeholder={selectedCourseDetail?.phong}
                    className={classes.InputStyle}
                    type="text"
                    value={value.phong}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        phong: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={classes.adminFormButton}>
                <button
                  className={classes.adminFormSubmitButton}
                  type="submit"
                  // onClick={() => handleCloseModal()}
                >
                  Lưu
                </button>

                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={closeModal}
                  // closeModal
                >
                  Thoát
                </button>
                {/* </Link> */}
              </div>
              {error.message ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};

export default Body;
