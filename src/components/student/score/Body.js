import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";

import { SET_ERRORS } from "../../../redux/actionTypes";
import { getScoreStudent } from "../../../redux/actions/studentActions";

// http://localhost:9090/api/admin/diem/N19DCCN085?maKeHoach=MKH1

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("studentUser"));

  const [valueMKH, setValueMKH] = useState("");
  console.log("valumakh", valueMKH);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});

    dispatch(
      getScoreStudent(user?.retObj?.userDetails?.username, valueMKH?.maKeHoach)
    );
  };

  const scores = useSelector((state) => state?.student?.scores?.retObj);
  console.log("scores", scores);

  // chỉnh sau
  useEffect(() => {
    if (scores?.length !== 0 || scores?.length === 0) {
      setLoading(false);
    }
  }, [scores]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      {/* <p className="block text-black ">Danh sách Điểm</p> */}
      <div className="flex flex-col mt-1">
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

              <button
                className="w-56 mt-auto text-white transition-all duration-200 bg-red-500 rounded-md h-9 hover:scale-105 hover:bg-red-700"
                type="submit"
              >
                Lọc
              </button>
            </div>
          </form>
        </div>
        <div>
          {/* {scores && (
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
          )} */}

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
                    Hiện tại điểm chưa được cập nhật
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
                          <th className="px-4 py-2">STT</th>
                          {/* <th className="px-4 py-2">Mã Sinh Viên</th> */}
                          {/* <th className="px-4 py-2">Sinh Viên</th> */}
                          <th className="px-4 py-2">Tên môn</th>
                          <th className="px-4 py-2">TC</th>
                          <th className="px-4 py-2">%CC</th>
                          <th className="px-4 py-2">%GK</th>
                          <th className="px-4 py-2">%CK</th>
                          <th className="px-4 py-2">Điểm CC</th>
                          <th className="px-4 py-2">Điểm GK</th>
                          <th className="px-4 py-2">Điểm CK</th>
                          <th className="px-4 py-2">TK10</th>
                          <th className="px-4 py-2">TKCH</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {scores?.map((score, idx) => (
                          <tr
                            className="justify-center item-center hover:bg-[#EEF5F5]"
                            key={idx}
                          >
                            <td className="px-4 py-2 border">{idx + 1}</td>

                            {/* <td className="px-4 py-2 border">{score.maSv}</td> */}
                            {/* <td className="px-4 py-2 border">{score.tenSv}</td> */}
                            <td className="px-4 py-2 border">{score.tenMh}</td>
                            <td className="px-4 py-2 border">{score.soTc}</td>
                            <td className="px-4 py-2 border">
                              {score.percentCc}
                            </td>
                            <td className="px-4 py-2 border">
                              {score.percentGk}
                            </td>
                            <td className="px-4 py-2 border">
                              {score.percentCk}
                            </td>
                            <td className="px-4 py-2 border">{score.cc}</td>
                            <td className="px-4 py-2 border">{score.gk}</td>
                            <td className="px-4 py-2 border">{score.ck}</td>
                            <td className="px-4 py-2 border">{score.tb}</td>
                            <td className="px-4 py-2 border">
                              {score.xepLoai}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
