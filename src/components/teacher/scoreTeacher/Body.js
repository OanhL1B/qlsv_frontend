import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getScoreCourse,
  getScorebyTeacherKHM,
} from "../../../redux/actions/teacherActions";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
//http://localhost:9090/api/admin/dsLopTc/giangVien/MAGV011?maKeHoach=MKH1
const Body = () => {
  const [valueMKH, setValueMKH] = useState("");
  const [course, setCourse] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const store = useSelector((state) => state);

  // course đó
  useEffect(() => {
    setIsLoading(true);
    dispatch(getScorebyTeacherKHM(valueMKH?.maKeHoach)); // ra lớp tín chỉ
    dispatch({ type: "RESET_SCORES" });
  }, [valueMKH]);

  const scorecourses = useSelector((state) => state?.teacher?.scorecourses);

  useEffect(() => {
    if (scorecourses?.length !== 0 || scorecourses?.length === 0) {
      setIsLoading(false);
    }
  }, [scorecourses]);

  const handleSubmit = (e) => {
    if (!scorecourses) return;
    e.preventDefault();
    setLoading(true);
    dispatch(getScoreCourse(scorecourses[0]?.maLopTc));
  };

  const scores = useSelector((state) => state.teacher.scores.retObj);
  useEffect(() => {
    if (scores?.length !== 0 || scores?.length === 0) {
      setLoading(false);
    }
  }, [scores]);
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">Danh sách Điểm</p>
      <div className="flex mt-1"></div>

      {/* ô search */}
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
                <MenuItem value="MKH0">Học kỳ 1 - Năm học 2022-2023</MenuItem>
                <MenuItem value="MKH1">Học kỳ 2 - Năm học 2022-2023</MenuItem>
                <MenuItem value="MKH3">Học kỳ 3 - Năm học 2022-2023</MenuItem>
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
                MenuProps={{ PaperProps: { style: { maxHeight: 294 } } }}
                SelectDisplayProps={{ sx: { overflow: "auto" } }}
              >
                <MenuItem value="">None</MenuItem>

                {loading ? (
                  <MenuItem disabled>Loadding</MenuItem>
                ) : (
                  scorecourses &&
                  scorecourses.length > 0 &&
                  scorecourses.map((ut, idx) => (
                    <MenuItem key={idx} value={ut?.maLopTc}>
                      {"Mã LTC: "} {ut.maLopTc} {" - "} {"Môn học: "} {ut.tenMh}{" "}
                    </MenuItem>
                  ))
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
            {loading && scores?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {scores?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp tín chỉ chưa nhập điểm
              </p>
            )}
          </div>

          {!loading && scores?.length > 0 && (
            <div>
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Mã Sinh Viên</th>
                    <th className="px-4 py-2">Chuyên Cần</th>
                    <th className="px-4 py-2">Giữa Kỳ</th>
                    <th className="px-4 py-2">Cuối Kỳ</th>
                    <th className="px-4 py-2">Trung Bình</th>
                    <th className="px-4 py-2">Xếp Loại</th>
                    <th className="px-4 py-2">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {scores?.map((score, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-2 border">{idx + 1}</td>

                      <td className="px-4 py-2 border">{score.maSv}</td>
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
                          // onClick={() => handleEditClick(score)}
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
      {/* {selectedScore ? (
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
  ) : null} */}
    </div>
  );
};

export default Body;
