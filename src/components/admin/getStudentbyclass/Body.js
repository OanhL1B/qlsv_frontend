import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Avatar } from "@mui/material";
import {
  deleteStudent,
  getStudentUnit,
  updateStudent,
} from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import {
  DELETE_STUDENT,
  SET_ERRORS,
  UPDATE_STUDENT,
} from "../../../redux/actionTypes";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import DetailStudent from "../DetailStudent/DetailStudent";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ImageUpload from "../../util/img/ImageUpload";
import ReactPaginate from "react-paginate";

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

const Body = () => {
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("");
  const [error, setError] = useState({});
  const units = useSelector((state) => state.admin.allUnit);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("text");
  // paging
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const itemsPerPage = 7;
  const store = useSelector((state) => state);
  // phục vụ xóa
  const UnitObj = units?.find((dp) => dp.tenLop === unit);
  const UnitId = UnitObj?.maLop;

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      //
    }
  }, [store.errors]);
  useEffect(() => {
    if (!unit) dispatch({ type: "RESET_STUDENTS" });
  }, [unit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    const UnitObj = units?.find((dp) => dp.tenLop === unit);
    if (!UnitObj) return;
    const UnitId = UnitObj.maLop;
    dispatch(getStudentUnit(UnitId, nextPage));
  };
  const students = useSelector((state) => state.admin.students.retObj);
  console.log("store", store);
  const dataPagine = useSelector((state) => state.admin.students);

  useEffect(() => {
    if (!units) return;
    if (!unit) return;
    const UnitObj = units.find((dp) => dp.tenLop === unit);
    const UnitId = UnitObj?.maLop;
    dispatch(getStudentUnit(UnitId, nextPage));
  }, [nextPage, units]);

  useEffect(() => {
    if (students?.length !== 0 || students?.length === 0) {
      setLoading(false);
    }
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  //Begin edit
  const [value, setValue] = useState({
    id: "",
    maSv: "",
    ho: "",
    ten: "",
    phai: "",
    ngaySinh: "",
    noiSinh: "",
    diaChi: "",
    trangThai: null,
    sdt: "",
    email: "",
    maLop: "",
    hinhAnh: "",
  });
  const [selectedStudent, setSelectedStudent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      hinhAnh: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("load image error!");
  };
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setModalMode("edit");
    setValue({
      id: student.id,
      maSv: student.maSv,
      ho: "",
      ten: "",
      phai: "",
      ngaySinh: "",
      noiSinh: "",
      diaChi: "",
      trangThai: student.trangThai,
      sdt: "",
      email: student.email,
      maLop: "",
      hinhAnh: "",
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};

    if (value.ho !== "") {
      updatedValue.ho = value.ho;
    } else {
      updatedValue.ho = selectedStudent.ho;
    }
    if (value.ten !== "") {
      updatedValue.ten = value.ten;
    } else {
      updatedValue.ten = selectedStudent.ten;
    }
    if (value.phai !== "") {
      updatedValue.phai = value.phai;
    } else {
      updatedValue.phai = selectedStudent.phai;
    }
    if (value.ngaySinh !== "") {
      updatedValue.ngaySinh = value.ngaySinh;
    } else {
      updatedValue.ngaySinh = selectedStudent.ngaySinh;
    }
    if (value.noiSinh !== "") {
      updatedValue.noiSinh = value.noiSinh;
    } else {
      updatedValue.noiSinh = selectedStudent.noiSinh;
    }
    if (value.diaChi !== "") {
      updatedValue.diaChi = value.diaChi;
    } else {
      updatedValue.diaChi = selectedStudent.diaChi;
    }
    if (value.sdt !== "") {
      updatedValue.sdt = value.sdt;
    } else {
      updatedValue.sdt = selectedStudent.sdt;
    }
    if (value.maLop !== "") {
      updatedValue.maLop = value.maLop;
    } else {
      updatedValue.maLop = selectedStudent.maLop;
    }
    if (value.hinhAnh !== "") {
      updatedValue.hinhAnh = value.hinhAnh;
    } else {
      updatedValue.hinhAnh = selectedStudent.hinhAnh;
    }

    dispatch(updateStudent({ ...selectedStudent, ...updatedValue }));
    dispatch({ type: UPDATE_STUDENT, payload: false });
    closeModal();
  };

  useEffect(() => {
    if (!store.admin.updatedStudent) return;
    if (!selectedStudent.maLop) return;
    dispatch(getStudentUnit(selectedStudent.maLop, nextPage));
  }, [dispatch, store.admin.updatedStudent]);

  // }, [dispatch, store.errors, store.admin.updatedStudent]);

  // END EDIT-------------------------------------

  // BEGIN VIEW
  const [modalMode, setModalMode] = useState(null);
  const handleOpenViewModal = (student) => {
    console.log("select student", selectedStudent);
    setSelectedStudent(student);
    setModalMode("view");
    setIsModalOpen(true);
  };

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
        dispatch(deleteStudent(checkedValue));
      }
    });
  };
  useEffect(() => {
    if (store.admin.studentDeleted) {
      setCheckedValue([]);
      const UnitObj = units?.find((dp) => dp.tenLop === unit);
      const UnitId = UnitObj?.maLop;
      dispatch(getStudentUnit(UnitId, nextPage));
      dispatch({ type: DELETE_STUDENT, payload: false });
    }
  }, [store.admin.studentDeleted]);

  useEffect(() => {
    if (!store.errors) return;
    if (!UnitId) return;
    dispatch(getStudentUnit(UnitId, nextPage));
  }, [store.errors]);

  // END DELETE

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

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <p className="block text-black ">Danh sách sinh viên </p>
      {/*Thêm  */}
      <div className="flex mt-4">
        <Link to="/admin/addstudent" className="btn btn-primary">
          <button
            className="items-center gap-[9px] mr-4 w-[88px] h-[53px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Thêm
          </button>
        </Link>

        {students && (
          <button
            onClick={dltSubject}
            className={
              "items-center gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4" +
              (checkedValue && checkedValue.length
                ? " hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
                : "")
            }
            disabled={!(students && checkedValue?.length > 0)}
          >
            Xóa
          </button>
        )}
      </div>

      <div className="items-center my-8 mt-2 mb-2 rounded-lg ">
        <form
          className="flex flex-col col-span-1 space-y-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="department">Lớp</label>

          <div className="flex">
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 284 }}
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
            {loading && students?.length !== 0 && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#157572"
                messageColor="#157572"
              />
            )}
            {students?.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                Lớp chưa có sinh viên
              </p>
            )}
          </div>

          {!loading && students?.length > 0 && (
            <table className="w-full table-auto">
              <thead className="bg-[#E1EEEE] items-center">
                <tr>
                  <th className="px-4 py-2">Chọn</th>
                  <th className="px-4 py-2">STT</th>
                  <th className="px-4 py-2">Mã Sinh Viên</th>
                  <th className="px-4 py-2">Họ</th>
                  <th className="px-4 py-2">Tên</th>

                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody className="">
                {students?.map((student, idx) => (
                  <tr
                    className="justify-center item-center hover:bg-[#EEF5F5]"
                    key={idx}
                  >
                    <td className="px-4 py-2 border">
                      <input
                        onChange={handleInputChange}
                        checked={checkedValue.includes(student.id)}
                        value={student.id}
                        type="checkbox"
                      />
                    </td>
                    <td className="px-4 py-2 border">{idx + 1}</td>
                    <td className="px-4 py-2 border">{student.maSv}</td>
                    <td className="px-4 py-2 border">{student.ho}</td>
                    <td className="px-4 py-2 border">{student.ten}</td>
                    <td className="px-4 py-2 border">{student.email}</td>

                    <td className="items-center justify-center px-4 py-2 mr-0 border">
                      <button
                        className="px-3.5 py-1 mr-5 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572]  focus:outline-none focus:shadow-outline"
                        onClick={() => handleOpenViewModal(student)}
                      >
                        Xem
                      </button>
                      {modalMode === "view" && (
                        <DetailStudent
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          student={selectedStudent}
                        />
                      )}

                      <button
                        className="px-3.5 py-1 font-bold text-white rounded  hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline"
                        onClick={() => handleEditClick(student)}
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
      {/* edit */}

      {modalMode === "edit" && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className={classes.Form1}>
            <form className={classes.Form2} onSubmit={handleFormSubmit}>
              {/* item */}
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Mã Sinh Viên:</h1>
                  <input
                    placeholder={selectedStudent.maSv}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}> Họ:</h1>
                  <input
                    placeholder={selectedStudent.ho}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ho}
                    onChange={(e) => setValue({ ...value, ho: e.target.value })}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên :</h1>
                  <input
                    placeholder={selectedStudent.ten}
                    className={classes.InputStyle}
                    type="text"
                    value={value.ten}
                    onChange={(e) =>
                      setValue({ ...value, ten: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Giới tính :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.phai || selectedStudent.phai}
                    onChange={(e) =>
                      setValue({ ...value, phai: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="Nam">Nam</MenuItem>
                    <MenuItem value="Nữ">Nữ</MenuItem>
                  </Select>
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Ngày Sinh :</h1>

                  <input
                    placeholder={format(
                      new Date(selectedStudent.ngaySinh),
                      "MM/dd/yyyy"
                    )}
                    className={classes.InputStyle}
                    type={inputType}
                    value={value.ngaySinh}
                    onChange={(e) =>
                      setValue({ ...value, ngaySinh: e.target.value })
                    }
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Nơi Sinh :</h1>
                  <input
                    placeholder={selectedStudent.noiSinh}
                    className={classes.InputStyle}
                    type="text"
                    value={value.noiSinh}
                    onChange={(e) =>
                      setValue({ ...value, noiSinh: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Địa Chỉ :</h1>
                  <input
                    placeholder={selectedStudent.diaChi}
                    className={classes.InputStyle}
                    type="text"
                    value={value.diaChi}
                    onChange={(e) =>
                      setValue({ ...value, diaChi: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Số Điện thoại :</h1>
                  <input
                    placeholder={selectedStudent.sdt}
                    className={classes.InputStyle}
                    type="text"
                    value={value.sdt}
                    onChange={(e) =>
                      setValue({ ...value, sdt: e.target.value })
                    }
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Email :</h1>
                  <input
                    placeholder={selectedStudent.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Lớp :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{
                      height: 36,
                      outline: "none",
                    }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.maLop || selectedStudent.maLop}
                    onChange={(e) =>
                      setValue({ ...value, maLop: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    {units?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.maLop}>
                        {dp.tenLop}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-x-6">
                <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
                  <Avatar
                    src={value.hinhAnh || selectedStudent.hinhAnh}
                    style={{ width: 180, height: 180 }}
                  />
                </div>

                <div className="flex flex-col gap-y-5">
                  <h1 className="pb-2 text-sm font-medium text-left">
                    Hình ảnh sinh viên:
                  </h1>
                  <ImageUpload
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </div>
              </div>

              {/* buton */}
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/student" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={closeModal}
                  >
                    Hủy
                  </button>
                </Link>
              </div>
              {/* ERROR */}
              <div className={classes.loadingAndError}>
                {loading && (
                  <Spinner
                    message="Updating"
                    height={30}
                    width={150}
                    color="#111111"
                    messageColor="blue"
                  />
                )}
              </div>
            </form>
          </div>
        </ReactModal>
      )}

      {/* pagination */}
      {students?.length > 0 && (
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
