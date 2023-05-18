import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { ADD_DANG_KY_MON, SET_ERRORS } from "../../../redux/actionTypes";
import { format } from "date-fns";
import {
  dangKymon,
  getAllCoursebysomething,
} from "../../../redux/actions/studentActions";

// http://localhost:9090/api/admin/dang-ky-mon
//http://localhost:9090/api/admin/dsLopTc?maKeHoach=MKH1&maLop=D19CQCNPM01-N
const Body = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const units = useSelector((state) => state.admin.allUnit);
  console.log("units", units);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  console.log("store", store);
  const user = JSON.parse(localStorage.getItem("studentUser"));

  const [value, setValue] = useState({
    maKeHoach: "",
    maLop: "",
  });

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
    const UnitId = UnitObj?.maLop;
    dispatch(
      getAllCoursebysomething({
        params: {
          ...value,
          maLop: UnitId,
        },
      })
    );
  };

  const courses = useSelector((state) => state.student.courses);

  useEffect(() => {
    if (courses?.length !== 0) {
      setLoading(false);
    }
  }, [courses]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // đăng ký môn
  const [checkedValue, setCheckedValue] = useState([]);
  console.log("checked value", checkedValue);
  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  // masv:

  const dangkymon = (e) => {
    dispatch(
      dangKymon({
        maSv: user.retObj.userDetails.username,
        maLopTcList: checkedValue,
      })
    );
  };
  // câp nhật lại
  useEffect(() => {
    if (store.student.dangkymonAdded) {
      setCheckedValue([]);
      const UnitObj = units?.find((dp) => dp.tenLop === unit);
      const UnitId = UnitObj?.maLop;
      dispatch(
        getAllCoursebysomething({
          params: {
            ...value,
            maLop: UnitId,
          },
        })
      );
      dispatch({ type: ADD_DANG_KY_MON, payload: false });
    }
  }, [store.student.dangkymonAdded]);
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">Danh sách Lớp Tín chỉ</p>
      <button
        onClick={dangkymon}
        className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
      >
        DKM
      </button>
      {/* ô search */}
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          {/* <div className={classes.FormItem}>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Kế hoạch năm *:</h1>
              <Select
                displayEmpty
                sx={{ height: 36 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.maKeHoach}
                onChange={(e) =>
                  setValue({ ...value, maKeHoach: e.target.value })
                }
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="MKH0">Học kỳ 1 - Năm học 2022-2023</MenuItem>
                <MenuItem value="MKH1">Học kỳ 2 - Năm học 2022-2023</MenuItem>
                <MenuItem value="MKH3">Học kỳ 3 - Năm học 2022-2023</MenuItem>
              </Select>
            </div>
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Lớp học:</h1>
              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 224 }}
                inputProps={{ "aria-label": "Without label" }}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {units?.map((ut, idx) => (
                  <MenuItem key={idx} value={ut.tenLop}>
                    {ut.tenLop}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={classes.WrapInputLabel}>
              <button
                className=" ml-12 mt-7 items-center my-auto bg-red-500 w-56 h-[40px] rounded-md text-white hover:scale-105 hover:bg-red-700 transition-all duration-200"
                type="submit"
              >
                Search
              </button>
            </div>
          </div> */}
          <div className="flex mt-2 gap-x-2">
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Chọn học kỳ:</span>

              <Select
                displayEmpty
                sx={{ height: 36, width: 274 }}
                inputProps={{ "aria-label": "Without label" }}
                value={value.maKeHoach}
                onChange={(e) =>
                  setValue({ ...value, maKeHoach: e.target.value })
                }
                className=" h-10  bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm hover:focus:border-none"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="MKH0">Học kỳ 1 - Năm học 2022-2023</MenuItem>
                <MenuItem value="MKH1">Học kỳ 2 - Năm học 2022-2023</MenuItem>
                <MenuItem value="MKH3">Học kỳ 3 - Năm học 2022-2023</MenuItem>
              </Select>
            </div>
            <div className="flex flex-col">
              <span className="mb-1 text-text2">Lớp</span>

              <Select
                required
                displayEmpty
                sx={{ height: 36, width: 274 }}
                inputProps={{ "aria-label": "Without label" }}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
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
            {loading && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {courses?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp chưa có Lớp tín chỉ
              </p>
            )}
          </div>
          {search &&
            !loading &&
            Object.keys(error).length === 0 &&
            courses?.length !== 0 && (
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-2">Chọn</th>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Mã Lớp Tín Chỉ</th>
                    <th className="px-4 py-2">Tên môn học</th>
                    <th className="px-4 py-2">Số lượng</th>
                    <th className="px-4 py-2">Số lượng còn</th>
                    <th className="px-4 py-2">Tên giảng viên</th>
                  </tr>
                </thead>
                <tbody className="">
                  {courses?.map((course, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-2 border ">
                        {/* <input
                          // onChange={handleInputChange}

                          value={course.maLopTc}
                          type="checkbox"
                          onChange={(e) =>
                            setCheckedValue({
                              ...checkedValue,
                              maLopTc: e.target.value,
                            })
                          }
                        /> */}
                        <input
                          onChange={handleInputChange}
                          checked={checkedValue.includes(course.maLopTc)}
                          value={course.maLopTc}
                          type="checkbox"
                        />
                      </td>

                      <td className="px-4 py-2 border">{idx + 1}</td>

                      <td className="px-4 py-2 border">{course.maLopTc}</td>
                      <td className="px-4 py-2 border">{course.tenMh}</td>
                      {/* <td className="px-4 py-2 border">
                        {format(new Date(course.timeBd), "dd/MM/yyyy")}
                      </td>

                      <td className="px-4 py-2 border">
                        {" "}
                        {format(new Date(course.timeKt), "dd/MM/yyyy")}
                      </td> */}
                      <td className="px-4 py-2 border">{course.soLuong}</td>
                      <td className="px-4 py-2 border">{course.soLuongCon}</td>

                      <td className="px-4 py-2 border">{course.tenGv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};

export default Body;
