import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import { SET_ERRORS } from "../../../redux/actionTypes";
import { getThongkebysomething } from "../../../redux/actions/adminActions";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import "./index.css";
import ReactModal from "react-modal";
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};
const ThongKeView = ({ thongke, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [value, setValue] = useState({
    idLopTc: thongke,
    col: "",
  });
  // console.log("store", store);
  // http://localhost:9090/api/admin/diem/thong-ke?idLopTc=da6c6f34&col=XEPLOAI
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
    dispatch(
      getThongkebysomething({
        params: {
          ...value,
        },
      })
    );
  };

  const thongkes = useSelector((state) => state.admin.thongkes);

  useEffect(() => {
    if (thongkes?.length !== 0 || thongkes?.length === 0) {
      setLoading(false);
    }
  }, [thongkes]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handelReset = () => {
    onClose();
    setSearch(false);
    setLoading(false);
    setError({});
    // setValue("");
  };
  return (
    <ReactModal
      style={modalStyles}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="flex-[0.8] mt-3 mx-5 item-center">
        <div className="flex items-center justify-center gap-5">
          <button
            className={classes.adminFormClearButton}
            type="button"
            // onClick={onClose}
            onClick={() => handelReset()}
          >
            thoát
          </button>
        </div>
        <div className="items-center my-8 mt-2 mb-2 rounded-lg">
          <form
            className="flex flex-col col-span-1 space-y-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="department">Biểu đồ Thống kê theo: </label>

            <div className="flex">
              <div>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.col}
                  onChange={(e) => setValue({ ...value, col: e.target.value })}
                  className={`${classes.InputStyle} hover:focus:border-none w-[166px] `}
                >
                  <MenuItem value="">NONE</MenuItem>

                  <MenuItem value="CC">Chuyên cần</MenuItem>
                  <MenuItem value="GK">Giữa kỳ</MenuItem>
                  <MenuItem value="CK">Kuoiws kỳ</MenuItem>
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
          {loading && thongkes?.length !== 0 && (
            <Spinner
              message="Loading"
              height={50}
              width={150}
              color="#157572"
              messageColor="#157572"
            />
          )}
        </div>
        {!loading && search && thongkes && (
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
  );
};

export default ThongKeView;
