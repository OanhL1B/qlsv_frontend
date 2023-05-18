import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearThongkes,
  getCoursebyKeHoachNam,
  getThongkebysomething,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import ThongKeView from "../thongkeView/ThongKeView";
import ReactModal from "react-modal";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
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
const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const [value, setValue] = useState({
    idKeHoachNam: "",
    keySearch: "",
  });

  const [initialKeySearch, setInitialKeySearch] = useState("");

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
    setInitialKeySearch(value.keySearch);
    console.log("value", value);
    dispatch(
      getCoursebyKeHoachNam({
        params: {
          ...value,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(
      getCoursebyKeHoachNam({
        params: {
          ...value,
        },
      })
    );
  }, [dispatch, store.errors]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const courses = useSelector((state) => state.admin.courses);

  useEffect(() => {
    if (courses?.length !== 0 || courses?.length === 0) {
      setLoading(false);
    }
  }, [courses]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  //// modal
  const [selectedThongke, setSelectedThongke] = useState("");
  const [modalMode, setModalMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [valuethongke, setValuethongke] = useState({
    idLopTc: "",
    col: "",
  });
  const handleOpenViewModal = (course) => {
    setSelectedThongke(course);
    setIsModalOpen(true);
    setModalMode("view");
    setValuethongke({
      ...valuethongke,
      idLopTc: course.id,
    });
  };

  const [errorthongke, setErrorthongke] = useState({});
  const [searchthongke, setSearchthongke] = useState(false);
  const [loadingthongke, setLoadingthongke] = useState(false);

  console.log("selectedThongke", selectedThongke);

  console.log("valuethongke", valuethongke);
  // console.log("store", store);
  // http://localhost:9090/api/admin/diem/thong-ke?idLopTc=da6c6f34&col=XEPLOAI
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setErrorthongke(store.errors);
      setLoadingthongke(false);
    }
  }, [store.errors]);

  const handleSubmitThongke = (e) => {
    e.preventDefault();
    setSearchthongke(true);
    setLoadingthongke(true);
    setErrorthongke({});
    console.log("valuethongke", valuethongke);
    dispatch(
      getThongkebysomething({
        params: {
          ...valuethongke,
        },
      })
    );
  };
  const thongkes = useSelector((state) => state.admin.thongkes);
  console.log("thongke", thongkes);

  useEffect(() => {
    if (thongkes?.length !== 0 || thongkes?.length === 0) {
      setLoadingthongke(false);
    }
  }, [thongkes]);

  const handelReset = () => {
    setIsModalOpen(false);
    setSearch(false);
    setLoading(false);
    setError({});
    setValuethongke("");
    dispatch({ type: "CLEAR_THONGKES" });
  };

  useEffect(() => {
    getCoursebyKeHoachNam({
      params: {
        idKeHoachNam: value.idKeHoachNam,
        keySearch: initialKeySearch, // sử dụng keySearch ban đầu để gọi lại API
      },
    });
  }, [dispatch, store.errors, store.admin.thongkes]);
  // get lại sao mỗi lần coi nè
  console.log("courses", courses);
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">
        Danh sách Lớp Tín chỉ của kế hoạch năm:
      </p>

      {/* ô search */}

      <div className="mt-10">
        <form className="" onSubmit={handleSubmit}>
          <div className={classes.FormItem}>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Kế hoạch năm *:</h1>
              <Select
                displayEmpty
                sx={{ height: 36 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.idKeHoachNam}
                onChange={(e) =>
                  setValue({ ...value, idKeHoachNam: e.target.value })
                }
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="c2b42960">
                  Học kỳ 1 - Năm học 2022-2023
                </MenuItem>
                <MenuItem value="13272bdc">
                  Học kỳ 2 - Năm học 2022-2023
                </MenuItem>
                <MenuItem value="322275f3">
                  Học kỳ 3 - Năm học 2022-2023
                </MenuItem>
              </Select>
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Tìm môn học:</h1>
              <input
                placeholder="Tên môn học"
                className={classes.InputStyle}
                type="text"
                value={value.keySearch}
                onChange={(e) =>
                  setValue({ ...value, keySearch: e.target.value })
                }
              />
            </div>
            <div className={classes.WrapInputLabel}>
              <button
                className="mt-7 items-center my-auto bg-red-500 w-56 h-[40px] rounded-md text-white hover:scale-105 hover:bg-red-700 transition-all duration-200"
                type="submit"
              >
                Lọc
              </button>
            </div>
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

            {courses?.length < 0 && (
              <p className="text-2xl font-bold text-red-500">
                Chưa có lớp tín chỉ nào trong kế hoạch năm này!
              </p>
            )}
          </div>

          {!loading &&
            // Object.keys(error).length === 0 &&
            courses?.length > 0 && (
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Mã Lớp Tín Chỉ</th>
                    <th className="px-4 py-2">Số lượng</th>
                    <th className="px-4 py-2">Số lượng còn</th>
                    <th className="px-4 py-2">Tên môn học</th>
                    <th className="px-4 py-2">Tên giảng viên</th>
                    <th className="px-4 py-2">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {courses?.map((course, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-2 border">{idx + 1}</td>
                      <td className="px-4 py-2 border">{course.maLopTc}</td>
                      <td className="px-4 py-2 border">{course.soLuong}</td>
                      <td className="px-4 py-2 border">{course.soLuongCon}</td>
                      <td className="px-4 py-2 border">{course.tenMh}</td>
                      <td className="px-4 py-2 border">{course.tenGv}</td>
                      {/* cách 1 */}
                      {/* <td className="px-4 py-2 border">
                        <div className="flex flex-col items-center justify-center h-full gap-y-1">
                          <Link
                            to={{
                              pathname: `/admin/thongkedetail/${encodeURIComponent(
                                course.id
                              )}`,
                            }}
                          >
                            <button className="w-full whitespace-nowrap h-full px-3 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline">
                              Xem thống kê
                            </button>
                          </Link>
                        </div>
                      </td> */}
                      {/* <td className="px-4 py-2 border">
                        <div className="flex flex-col items-center justify-center h-full gap-y-1">
                          <button
                            className="px-3.5 py-1 mr-5 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572]  focus:outline-none focus:shadow-outline"
                            onClick={() => handleOpenViewModal(course)}
                          >
                            Xem
                          </button>
                          {modalMode === "view" && (
                            <ThongKeView
                              isOpen={isModalOpen}
                              onClose={closeModal}
                              thongke={selectedThongke}
                            />
                          )}
                        </div>
                      </td> */}
                      <td className="items-center justify-center px-4 py-2 mr-0 border">
                        <button
                          className="px-3.5 py-1 mr-5 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572]  focus:outline-none focus:shadow-outline"
                          onClick={() => handleOpenViewModal(course)}
                        >
                          Xem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
      {modalMode === "view" && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex-[0.8] mt-3 mx-5 item-center w-[1000px] h-[650px] ">
            <div className="flex items-center justify-end gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handelReset()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <div className="text-xl font-medium text-text1">
                Thông tin lớp tín chỉ:
              </div>
              <div className="text-lg font-semibold text-text1">
                Môn học: {"   "}
                <span className="text-base font-normal text-text2">
                  {selectedThongke.tenMh}
                </span>
              </div>
              <div className="text-lg font-semibold text-text1">
                Mã lớp tín chỉ: {"  "}{" "}
                <span className="text-base font-normal text-text2">
                  {selectedThongke.maLopTc}
                </span>
              </div>
              <div className="text-lg font-semibold text-text1">
                Tên giảng viên: {"  "}{" "}
                <span className="text-base font-normal text-text2">
                  {" "}
                  {selectedThongke.tenGv}
                </span>
              </div>
              <div className="text-lg font-semibold text-text1">
                Tên lớp: {"  "}{" "}
                <span className="text-base font-normal text-text2">
                  {" "}
                  {selectedThongke.tenLop}
                </span>
              </div>
            </div>
            <div className="items-center my-8 mt-2 mb-2 rounded-lg">
              <form
                className="flex flex-col col-span-1 space-y-2"
                onSubmit={handleSubmitThongke}
              >
                <label htmlFor="department">Biểu đồ Thống kê theo: </label>

                <div className="flex">
                  <div>
                    <Select
                      required
                      displayEmpty
                      sx={{ height: 36 }}
                      inputProps={{ "aria-label": "Without label" }}
                      value={valuethongke.col}
                      onChange={(e) =>
                        setValuethongke({
                          ...valuethongke,
                          col: e.target.value,
                        })
                      }
                      className={`${classes.InputStyle} hover:focus:border-none w-[166px] `}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="CC">Chuyên cần</MenuItem>
                      <MenuItem value="GK">Giữa kỳ</MenuItem>
                      <MenuItem value="CK">Cuối kỳ</MenuItem>
                      <MenuItem value="TB">Trung bình</MenuItem>
                      <MenuItem value="XEPLOAI">Xếp loại</MenuItem>
                    </Select>
                  </div>

                  <button
                    className={`${classes.adminFormSubmitButton} w-56 ml-3`}
                    type="submit"
                  >
                    Lọc
                  </button>
                </div>
              </form>
            </div>
            <div className={classes.loadingAndError}>
              {loadingthongke && thongkes?.length !== 0 && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
            </div>
            {!loadingthongke && thongkes.length > 0 && (
              <div className="flex-[0.8] mt-10 mx-5 item-center">
                <BarChart width={800} height={300} data={thongkes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis
                    label={{
                      value: "Số lượng",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Legend />

                  <Bar
                    dataKey="soLuong"
                    fill="#8884d8"
                    barSize={30}
                    label={{
                      position: "top",
                    }}
                  />
                </BarChart>
              </div>
            )}
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Body;
