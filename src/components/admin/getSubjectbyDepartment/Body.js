import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubject,
  getSubjectDepartment,
  updateSubject,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import {
  DELETE_UNIT,
  SET_ERRORS,
  UPDATE_SUBJECT,
} from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

// http://localhost:9090/api/admin/monHoc/khoa/CNTT?page=0&size=3

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};
const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  console.log("store", store);
  // paging
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const itemsPerPage = 7;

  // phục vụ xóa
  const departmentObj = departments?.find((dp) => dp.tenKhoa === department);
  const departmentId = departmentObj?.maKhoa;
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);
  useEffect(() => {
    if (!department) dispatch({ type: "RESET_SUBJECTS" });
  }, [department]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const departmentObj = departments.find((dp) => dp.tenKhoa === department);
    if (!departmentObj) return;
    const departmentId = departmentObj?.maKhoa;
    dispatch(getSubjectDepartment(departmentId, nextPage));
  };

  const subjects = useSelector((state) => state.admin.subjects.retObj);
  const dataPagine = useSelector((state) => state.admin.subjects);
  useEffect(() => {
    if (!departments) return;
    if (!department) return;
    const departmentObj = departments.find((dp) => dp.tenKhoa === department);
    const departmentId = departmentObj?.maKhoa;
    dispatch(getSubjectDepartment(departmentId, nextPage));
  }, [nextPage, departments]);

  useEffect(() => {
    if (subjects?.length !== 0 || subjects?.length === 0) {
      setLoading(false);
    }
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // begin edit
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
  const [selectedSubject, setSelectedSubject] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (sub) => {
    setSelectedSubject(sub);
    setIsModalOpen(true);
    setValue({
      maMh: sub.maMh,
      tenMh: "",
      soTc: "",
      percentCc: "",
      percentGk: "",
      percentCk: "",
      soTietLt: "",
      soTietTh: "",
      maKhoa: sub.maKhoa,
      id: sub.id,
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //modal
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedValue = {};
    if (value.tenMh !== "") {
      updatedValue.tenMh = value.tenMh;
    } else {
      updatedValue.tenMh = selectedSubject.tenMh;
    }
    if (value.soTc !== "") {
      updatedValue.soTc = value.soTc;
    } else {
      updatedValue.soTc = selectedSubject.soTc;
    }
    if (value.percentCc !== "") {
      updatedValue.percentCc = value.percentCc;
    } else {
      updatedValue.percentCc = selectedSubject.percentCc;
    }
    if (value.percentGk !== "") {
      updatedValue.percentGk = value.percentGk;
    } else {
      updatedValue.percentGk = selectedSubject.percentGk;
    }
    if (value.percentCk !== "") {
      updatedValue.percentCk = value.percentCk;
    } else {
      updatedValue.percentCk = selectedSubject.percentCk;
    }
    if (value.soTietLt !== "") {
      updatedValue.soTietLt = value.soTietLt;
    } else {
      updatedValue.soTietLt = selectedSubject.soTietLt;
    }
    if (value.soTietTh !== "") {
      updatedValue.soTietTh = value.soTietTh;
    } else {
      updatedValue.soTietTh = selectedSubject.soTietTh;
    }
    dispatch(updateSubject({ ...selectedSubject, ...updatedValue }));
    dispatch({ type: UPDATE_SUBJECT, payload: false });
    closeModal();
  };

  useEffect(() => {
    if (!store.admin.updatedSubject) return;
    if (!selectedSubject.maKhoa) return;
    dispatch(getSubjectDepartment(selectedSubject.maKhoa, nextPage));
  }, [dispatch, store.errors, store.admin.updatedSubject]);

  // END EDIT

  // BEGIN DELETE

  const [checkedValue, setCheckedValue] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setCheckedValue((prevState) =>
      isChecked
        ? [...prevState, value]
        : prevState.filter((item) => item !== value)
    );
  };

  // const dltSubject = (e) => {
  //   dispatch(deleteUnit(checkedValue));
  // };
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
        dispatch(deleteSubject(checkedValue));
      }
    });
  };

  useEffect(() => {
    if (store.admin.subjectDeleted) {
      setLoading(false);
      setCheckedValue([]);
      const departmentObj = departments.find((dp) => dp.tenKhoa === department);
      const departmentId = departmentObj.maKhoa;
      dispatch(getSubjectDepartment(departmentId, nextPage));
      dispatch({ type: DELETE_UNIT, payload: false });
    }
  }, [store.admin.subjectDeleted]);

  useEffect(() => {
    if (!store.errors) return;
    dispatch(getSubjectDepartment(departmentId, nextPage));
  }, [store.errors]);

  //PAGING
  useEffect(() => {
    if (!dataPagine || !dataPagine.totalPages) return;
    setPageCount(Math.ceil(dataPagine.totalRetObjs / itemsPerPage));
  }, [dataPagine, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataPagine.totalRetObjs;
    setItemOffset(newOffset);
    console.log("vô đây nè huu", nextPage);
    setNextPage(event.selected + 1 - 1);
  };
  //END DELETE
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">Danh sách Môn học</p>

      <div className="flex mt-4">
        <Link to="/admin/adddsubject" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>

        {/* {units && units?.length !== 0 && (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
          >
            Xóa
          </button>
        )} */}
        {/* hay vl */}
        {subjects && subjects.length !== 0 && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(subjects && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}

        {/* <button
          onClick={dltSubject}
          className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
        >
          Xóa
        </button> */}
      </div>

      {/* ô search */}
      <div className="items-center my-8 mt-2 mb-2 rounded-lg">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="department">Khoa</label>

          <div className="flex">
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.tenKhoa}>
                  {dp.tenKhoa}
                </MenuItem>
              ))}
            </Select>
            <button
              className={`${classes.adminFormSubmitButton} w-56 ml-3`}
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
            {/* chỗ này là bug đó nhưng thôi kệ lấp liếm đi vậy, 001s thôi mà, làm gì căng */}
            {loading && subjects?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}

            {/* chỗ này tạm thời để vậy đã */}
            {subjects?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Khoa chưa có môn học
              </p>
            )}
          </div>

          {search &&
            !loading &&
            // Object.keys(error).length === 0 &&
            subjects?.length !== 0 && (
              <table className="w-full table-auto">
                <thead className="bg-[#E1EEEE] items-center">
                  <tr>
                    <th className="px-4 py-2">Chọn</th>
                    <th className="px-4 py-2">STT</th>
                    <th className="px-4 py-2">Mã môn học</th>
                    <th className="px-4 py-2">Tên môn học</th>
                    <th className="px-4 py-2">%CC</th>
                    <th className="px-4 py-2">%GK</th>
                    <th className="px-4 py-2">%CK</th>
                    <th className="px-4 py-2">Số tiết lý thuyết</th>
                    <th className="px-4 py-2">Số tiết thực hành</th>
                    <th className="px-4 py-2">Số tín chỉ</th>
                    <th className="px-4 py-2">Hành động</th>
                  </tr>
                </thead>
                <tbody className="">
                  {subjects?.map((sub, idx) => (
                    <tr
                      className="justify-center item-center hover:bg-[#EEF5F5]"
                      key={idx}
                    >
                      <td className="px-4 py-2 border">
                        <input
                          onChange={handleInputChange}
                          checked={checkedValue.includes(sub.id)}
                          value={sub.id}
                          type="checkbox"
                        />
                      </td>
                      <td className="px-4 py-2 border">{idx + 1}</td>

                      <td className="px-4 py-2 border">{sub.maMh}</td>
                      <td className="px-4 py-2 border">{sub.tenMh}</td>
                      <td className="px-4 py-2 border">{sub.percentCc}</td>
                      <td className="px-4 py-2 border">{sub.percentGk}</td>
                      <td className="px-4 py-2 border">{sub.percentCk}</td>
                      <td className="px-4 py-2 border">{sub.soTietLt}</td>
                      <td className="px-4 py-2 border">{sub.soTietTh}</td>
                      <td className="px-4 py-2 border">{sub.soTc}</td>

                      <td
                        className="items-center justify-center px-4 py-2 mr-0 border"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                          onClick={() => handleEditClick(sub)}
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

      {selectedSubject ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl">
            <form
              className="w-full min-h-[400px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-4 mt-4 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Môn Học:</h1>
                  <input
                    placeholder={selectedSubject?.maMh}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                    value={value.maMh}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Ten Môn Học :</h1>
                  <input
                    placeholder={selectedSubject?.tenMh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.tenMh}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tenMh: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tín Chỉ :</h1>
                  <input
                    placeholder={selectedSubject?.soTc}
                    className={classes.InputStyle}
                    type="text"
                    value={value.soTc}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        soTc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>%CC :</h1>
                  <input
                    placeholder={selectedSubject?.percentCc}
                    className={classes.InputStyle}
                    type="text"
                    value={value.percentCc}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        percentCc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>%GK :</h1>
                  <input
                    placeholder={selectedSubject?.percentGk}
                    className={classes.InputStyle}
                    type="text"
                    value={value.percentGk}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        percentGk: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>%CK :</h1>
                  <input
                    placeholder={selectedSubject?.percentCk}
                    className={classes.InputStyle}
                    type="text"
                    value={value.percentCk}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        percentCk: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tiết lý thuyết :</h1>
                  <input
                    placeholder={selectedSubject?.soTietLt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.soTietLt}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        soTietLt: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Tiết thực hành :</h1>
                  <input
                    placeholder={selectedSubject?.soTietTh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.soTietTh}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        soTietTh: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/allsubject" className="btn btn-primary">
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
      {subjects?.length > 0 && (
        <div className="flex items-center justify-center w-full mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Body;
