import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COURSE_DETAIL, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { addCourseDetail } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";

const Body = () => {
  const { course } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  console.log("error", error);
  const [value, setValue] = useState({
    tiet: "",
    thu: "",
    soTiet: "",
    phong: "",
    maLopTc: course,
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addCourseDetail(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.coursedetailAdded) {
      setLoading(false);
      if (store.admin.coursedetailAdded) {
        setValue({
          tiet: "",
          thu: "",
          soTiet: "",
          phong: "",
          maLopTc: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_COURSE_DETAIL, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.coursedetailAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-1 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm chi tiết lớp tín chỉ</h1>
        </div>
        <Link to="/admin/coursedetail" className="btn btn-primary">
          <button className="mt-2 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className={classes.Form1}>
          <form
            className="w-full min-h-[300px] py-8 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Mã Lớp Tín Chỉ :</h1>

                <input
                  placeholder={course}
                  required
                  className={classes.InputStyle}
                  type="text"
                  disabled
                  value={value.maLopTc}
                  // onChange={(e) => setValue({ ...value, maLopTc: maLopTc })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tiết bắt đầu*:</h1>

                {/* <input
                  placeholder="Tiết"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.tiet}
                  onChange={(e) => setValue({ ...value, tiet: e.target.value })}
                /> */}
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.tiet}
                  onChange={(e) => setValue({ ...value, tiet: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Thứ *:</h1>

                {/* <input
                  placeholder="Thứ"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.thu}
                  onChange={(e) => setValue({ ...value, thu: e.target.value })}
                /> */}
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.thu}
                  onChange={(e) => setValue({ ...value, thu: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
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
                <h1 className={classes.LabelStyle}>Số tiết *:</h1>

                {/* <input
                  placeholder="Số tiết"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.soTiet}
                  onChange={(e) =>
                    setValue({ ...value, soTiet: e.target.value })
                  }
                /> */}
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.soTiet}
                  onChange={(e) =>
                    setValue({ ...value, soTiet: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Phòng *:</h1>

                <input
                  placeholder="Phòng"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.phong}
                  onChange={(e) =>
                    setValue({ ...value, phong: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    tiet: "",
                    thu: "",
                    soTiet: "",
                    phong: "",
                    maLopTc: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Xóa
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang thêm chi tiết lớp tín chỉ..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="157572"
                />
              )}

              {error.message ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
