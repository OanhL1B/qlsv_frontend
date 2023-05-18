import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDangkymon,
  getAllCoursebyMKH,
  getScoreCourse,
  updateScore,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import {
  DELETE_DANGKYMON,
  SET_ERRORS,
  UPDATE_SCORE,
} from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import Swal from "sweetalert2";

// http://localhost:9090/api/admin/diem/lopTc/detail/CNTT1
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
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [unit, setUnit] = useState("");
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
    console.log("rungning");
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebyMKH({
        params: {
          maKeHoach: valueMKH?.maKeHoach,
          maLop: UnitId,
        },
      })
    );
  }, [valueMKH, unit]);

  const courses = useSelector((state) => state.admin.courses);

  useEffect(() => {
    if (courses?.length !== 0) {
      setIsLoading(false);
    }
  }, [courses]);

  console.log("courses", courses);
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
    const CourseObj = courses?.find((dp) => dp.maLopTc === course);
    const CourseId = CourseObj?.maLopTc; // cần mã lớp tín chỉ

    dispatch(getScoreCourse(CourseId));
  };

  const scores = useSelector((state) => state.admin.scores.retObj);

  // chỉnh sau
  useEffect(() => {
    if (scores?.length !== 0 || scores?.length === 0) {
      setLoading(false);
    }
  }, [scores]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  //BEGIN EDIT
  const [value, setValue] = useState({
    id: "",
    cc: "",
    gk: "",
    ck: "",
    maSv: "",
    maLopTc: "",
  });
  const [selectedScore, setSelectedScore] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEditClick = (score) => {
    setSelectedScore(score);
    setIsModalOpen(true);
    setModalMode("edit");
    setValue({
      id: score.id,
      cc: "",
      gk: "",
      ck: "",
      maSv: score.maSv,
      maLopTc: score.maLopTc,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (value.cc !== "") {
      updatedValue.cc = value.cc;
    } else {
      updatedValue.cc = selectedScore.cc;
    }
    if (value.gk !== "") {
      updatedValue.gk = value.gk;
    } else {
      updatedValue.gk = selectedScore.gk;
    }
    if (value.ck !== "") {
      updatedValue.ck = value.ck;
    } else {
      updatedValue.ck = selectedScore.ck;
    }

    dispatch(updateScore({ ...selectedScore, ...updatedValue }));
    dispatch({ type: UPDATE_SCORE, payload: false });
    closeModal();
  };

  useEffect(() => {
    if (store.admin.updateScore) {
      dispatch(getScoreCourse(selectedScore.maLopTc));
    }
  }, [dispatch, store.errors, store.admin.updateScore]);
  //ENDEDIT
  // BEGIN DELETE

  // const [checkedValue, setCheckedValue] = useState([]);
  // check xóa
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   const isChecked = e.target.checked;
  //   setCheckedValue((prevState) =>
  //     isChecked
  //       ? [...prevState, value]
  //       : prevState.filter((item) => item !== value)
  //   );
  // };
  // // hàm xóa

  // const dltSubject = (e) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteDangkymon(checkedValue));
  //     }
  //   });
  // };
  // // câp nhật lại
  // useEffect(() => {
  //   if (store.admin.dangkymonDeleted) {
  //     setCheckedValue([]);
  //     const CourseObj = courses.find((dp) => dp.maLopTc === course);
  //     const CourseId = CourseObj.maLopTc; // cần mã lớp tín chỉ
  //     dispatch(getScoreCourse(CourseId));
  //     dispatch({ type: DELETE_DANGKYMON, payload: false });
  //   }
  // }, [store.admin.dangkymonDeleted]);
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      {/* <p className="block text-black ">Danh sách Điểm</p> */}
      {/* <div className="flex mt-1">
        
        {scores && scores.length !== 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(scores && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div> */}

      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <div className="flex mt-2 gap-x-2">
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Chọn học kỳ xem điểm:</span>

              <Select
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
              <span className="mb-1 text-text2">Lớp tín chỉ</span>

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
      {scores && (
        <div className="flex gap-x-2">
          <div className="text-base font-bold text-text1">
            Môn học:{" "}
            <span className="text-base font-normal text-text2">
              {scores[0]?.tenMh}
            </span>
          </div>
          <div className="text-base font-bold text-text1">
            Số tín chỉ:{" "}
            <span className="text-base font-normal text-text2">
              {scores[0]?.soTc}
            </span>
          </div>
          <div className="text-base font-bold text-text1">
            %CC-%GK-%CK:{" "}
            <span className="text-base font-normal text-text2">
              {scores[0]?.percentCc} {scores[0]?.percentGk}{" "}
              {scores[0]?.percentCk}
            </span>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="col-span-3">
          <div className={classes.loadingAndError}>
            {loading && scores?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {/* chỗ này tạm thời để vậy đã */}
            {scores?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp tín chỉ chưa nhập điểm
              </p>
            )}
          </div>

          {search &&
            !loading &&
            Object.keys(error).length === 0 &&
            scores?.length !== 0 && (
              <div>
                <table className="w-full table-auto">
                  <thead className="bg-[#E1EEEE] items-center">
                    <tr>
                      {/* <th className="px-4 py-2">Chọn</th> */}
                      <th className="px-4 py-2">STT</th>
                      <th className="px-4 py-2">Mã Sinh Viên</th>
                      <th className="px-4 py-2">Sinh Viên</th>
                      <th className="px-4 py-2">Tên môn</th>
                      {/* <th className="px-4 py-2">TC</th>
                      <th className="px-4 py-2">%CC</th>
                      <th className="px-4 py-2">%GK</th>
                      <th className="px-4 py-2">%CK</th> */}
                      <th className="px-4 py-2">Điểm CC</th>
                      <th className="px-4 py-2">Điểm GK</th>
                      <th className="px-4 py-2">Điểm CK</th>
                      <th className="px-4 py-2">TK10</th>
                      <th className="px-4 py-2">TKCH</th>
                      <th className="px-4 py-2">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {scores?.map((score, idx) => (
                      <tr
                        className="justify-center item-center hover:bg-[#EEF5F5]"
                        key={idx}
                      >
                        {/* <td className="px-4 py-2 border">
                          <input
                            onChange={handleInputChange}
                            checked={checkedValue.includes(score.id)}
                            value={score.id}
                            type="checkbox"
                          />
                        </td> */}
                        <td className="px-4 py-2 border">{idx + 1}</td>

                        <td className="px-4 py-2 border">{score.maSv}</td>
                        <td className="px-4 py-2 border">{score.tenSv}</td>
                        <td className="px-4 py-2 border">{score.tenMh}</td>
                        {/* <td className="px-4 py-2 border">{score.soTc}</td>
                        <td className="px-4 py-2 border">{score.percentCc}</td>
                        <td className="px-4 py-2 border">{score.percentGk}</td>
                        <td className="px-4 py-2 border">{score.percentCk}</td> */}
                        <td className="px-4 py-2 border">{score.cc}</td>
                        <td className="px-4 py-2 border">{score.gk}</td>
                        <td className="px-4 py-2 border">{score.ck}</td>
                        <td className="px-4 py-2 border">{score.tb}</td>
                        <td className="px-4 py-2 border">{score.xepLoai}</td>
                        <td
                          className="items-center justify-center px-4 py-2 mr-0 border"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <button
                            className="px-3.5 py-1 font-bold text-white rounded  hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                            onClick={() => handleEditClick(score)}
                          >
                            Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
      {selectedScore ? (
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
                  <h1 className={classes.LabelStyle}>Mã sinh viên:</h1>
                  <input
                    placeholder={selectedScore?.maSv}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maSv}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Chuyên Cần :</h1>
                  <input
                    placeholder={selectedScore?.cc}
                    className={classes.InputStyle}
                    type="number"
                    value={value.cc}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        cc: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giữa kỳ :</h1>
                  <input
                    placeholder={selectedScore?.gk}
                    className={classes.InputStyle}
                    type="number"
                    value={value.gk}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        gk: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Cuối kỳ :</h1>
                  <input
                    placeholder={selectedScore?.ck}
                    className={classes.InputStyle}
                    type="number"
                    value={value.ck}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        ck: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Trung bình :</h1>
                  <input
                    placeholder={selectedScore?.tb}
                    className={classes.InputStyle}
                    type="number"
                    value={value.tb}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tb: e.target.value,
                      })
                    }
                  />
                </div> */}
                {/* <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Xếp loại :</h1>

                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    // value={value.phai}
                    value={value.xepLoai || selectedScore.xepLoai}
                    onChange={(e) =>
                      setValue({ ...value, xepLoai: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="Xuất sắc">Xuất sắc</MenuItem>
                    <MenuItem value="Giỏi">Giỏi</MenuItem>
                    <MenuItem value="Khá">Khá</MenuItem>
                    <MenuItem value="Trung bình">Trung bình</MenuItem>
                    <MenuItem value="Yếu">Yếu</MenuItem>
                  </Select>
                </div> */}
              </div>
              <div className={classes.adminFormButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/allscore" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={closeModal}
                  >
                    Thoát
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};

export default Body;
