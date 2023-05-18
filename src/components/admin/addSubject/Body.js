import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { ADD_SUBJECT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { Link } from "react-router-dom";
import { addSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  console.log("departent", departments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    maMh: "",
    tenMh: "",
    soTc: "",
    percentCc: "",
    percentGk: "",
    percentCk: "",
    soTietLt: "",
    soTietTh: "",
    maKhoa: "",
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

    dispatch(addSubject(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.subjectAdded) {
      setLoading(false);
      if (store.admin.subjectAdded) {
        setValue({
          maMh: "",
          tenMh: "",
          soTc: "",
          percentCc: "",
          percentGk: "",
          percentCk: "",
          soTietLt: "",
          soTietTh: "",
          maKhoa: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_SUBJECT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.subjectAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <AddIcon />
          <h1>Thêm môn học</h1>
        </div>
        <Link to="/admin/allsubject" className="btn btn-[#157572]">
          <button className="block px-4 py-2 mt-5 font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            {/* 1 */}
            <div className="grid grid-cols-4 gap-x-10">
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Tên Môn Học :</h1>

                <input
                  placeholder="Tên Môn Học"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.tenMh}
                  onChange={(e) =>
                    setValue({ ...value, tenMh: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Mã Môn Học :</h1>

                <input
                  placeholder="Mã Môn Học"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.maMh}
                  onChange={(e) => setValue({ ...value, maMh: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số Tín Chỉ :</h1>

                <input
                  placeholder="Số Tín Chỉ"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.soTc}
                  onChange={(e) => setValue({ ...value, soTc: e.target.value })}
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Phần trăm chuyên cần :</h1>

                <input
                  placeholder="Số phần trăm chuyên cần"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.percentCc}
                  onChange={(e) =>
                    setValue({ ...value, percentCc: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Phần trăm giữa kỳ :</h1>

                <input
                  placeholder="Số phần trăm giữa kỳ"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.percentGk}
                  onChange={(e) =>
                    setValue({ ...value, percentGk: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Phần trăm cuối kỳ :</h1>

                <input
                  placeholder="Số phần trăm cuối kỳ"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.percentCk}
                  onChange={(e) =>
                    setValue({ ...value, percentCk: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số tiết lý thuyết :</h1>

                <input
                  placeholder="Số Tiết lý thuyết"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.soTietLt}
                  onChange={(e) =>
                    setValue({ ...value, soTietLt: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Số tiết thực hành :</h1>

                <input
                  placeholder="Số tiết thực hành"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.soTietTh}
                  onChange={(e) =>
                    setValue({ ...value, soTietTh: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Khoa *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.maKhoa}
                  onChange={(e) =>
                    setValue({ ...value, maKhoa: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  {departments?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.maKhoa}>
                      {dp.tenKhoa}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* 2 submit and clear*/}
            <div className={classes.adminFormButton}>
              <button className={classes.adminFormSubmitButton} type="submit">
                Gửi
              </button>
              <button
                onClick={() => {
                  setValue({
                    maMh: "",
                    tenMh: "",
                    soTc: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Xóa
              </button>
            </div>
            {/* 3 loading */}
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang thêm môn học..."
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
