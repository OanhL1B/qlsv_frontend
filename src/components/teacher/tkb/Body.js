import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";
import Spinner from "../../../utils/Spinner";
import { getAllTKB } from "../../../redux/actions/teacherActions";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);
  const [inputType, setInputType] = useState("text");

  const [value, setValue] = useState({
    timeInputBegin: "",
    timeInputEnd: "",
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getAllTKB(value));
  };
  const allTKB = useSelector((state) => state.admin.allTKB);

  useEffect(() => {
    if (allTKB?.length !== 0) {
      setLoading(false);
    }
  }, [allTKB]);
  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);
  return (
    // <div className="mx-5 mt-10 item-center">
    //   <div className="space-y-5">
    //     <div className="my-8 mt-2 mb-2 rounded-lg ">
    //       <form
    //         className="flex flex-col items-center justify-center col-span-1 mx-auto space-y-2"
    //         onSubmit={handleFormSubmit}
    //       >
    //         <div className="grid grid-cols-3 gap-x-10">
    //           <div className="flex flex-col mb-4 ">
    //             <h1 className={classes.LabelStyle}>thời gian bắt đầu :</h1>

    //             <input
    //               placeholder="Thời gian bắt đầu"
    //               className="h-full w-full py-2 px-3 bg-[#DDDEEE] bg-opacity-50 rounded-md outline-none text-sm"
    //               type={inputType}
    //               value={value.timeInputBegin}
    //               onChange={(e) =>
    //                 setValue({ ...value, timeInputBegin: e.target.value })
    //               }
    //               onFocus={() => setInputType("date")}
    //               onBlur={() => setInputType("text")}
    //             />
    //           </div>
    //           <div className="flex flex-col mb-4">
    //             <h1 className={classes.LabelStyle}>thời gian kết thúc :</h1>

    //             <input
    //               placeholder="Thời gian bắt đầu"
    //               className={classes.InputStyle}
    //               type={inputType}
    //               value={value.timeInputEnd}
    //               onChange={(e) =>
    //                 setValue({ ...value, timeInputEnd: e.target.value })
    //               }
    //               onFocus={() => setInputType("date")}
    //               onBlur={() => setInputType("text")}
    //             />
    //           </div>
    //           <div className="flex flex-col mt-8 mb-4">
    //             <button
    //               className="w-56 h-8 ml-3 text-white transition-all duration-200 bg-red-500 rounded-md hover:scale-105 hover:bg-red-700"
    //               type="submit"
    //             >
    //               Search
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //     <div className="w-full">
    //       <div className="col-span-3">
    //         <div className={classes.loadingAndError}>
    //           {loading && (
    //             <Spinner
    //               message="Loading"
    //               height={50}
    //               width={150}
    //               color="#157572"
    //               messageColor="#157572"
    //             />
    //           )}
    //           {/* chỗ này tạm thời để vậy đã */}
    //           {/* {allTKB?.length === 0 && (
    //           <p className="text-2xl font-bold text-red-500">
    //             giáo viên chưa có thời khó biểu
    //           </p>
    //         )} */}
    //         </div>

    //         {search &&
    //           !loading &&
    //           Object.keys(error).length === 0 &&
    //           allTKB?.length !== 0 && (
    //             <table className="w-full table-auto">
    //               <thead className="bg-[#E1EEEE] items-center">
    //                 <tr>
    //                   <th className="px-4 py-2">STT</th>
    //                   <th className="px-4 py-2">mã môn học</th>
    //                   <th className="px-4 py-2">Tiết bắt đầu</th>
    //                   <th className="px-4 py-2">Phòng học</th>
    //                 </tr>
    //               </thead>
    //               <tbody className="">
    //                 {allTKB?.map((teacher, idx) => (
    //                   <tr
    //                     className="justify-center item-center hover:bg-[#EEF5F5]"
    //                     key={idx}
    //                   >
    //                     <td className="px-4 py-2 border">{idx + 1}</td>

    //                     <td className="px-4 py-2 border">{teacher.maMh}</td>
    //                     <td className="px-4 py-2 border">{teacher.tiet}</td>
    //                     <td className="px-4 py-2 border">{teacher.phong}</td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      {/* <body class="bg-gray-100">
        <div class="container mx-auto p-4">
          <h1 class="text-2xl font-bold mb-4">Thời khóa biểu</h1>
          <div class="grid grid-cols-7 gap-4">
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col gap-y-10">
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>8:00 - 11:00 Sáng</li>
                </ul>
              </div>
              <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Thứ 2</h2>
                <ul class="list-disc pl-4">
                  <li>13:30 - 16:30 Chiều</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </body> */}
      <div className="mx-10 mt-20">
        <table className="w-full h-full border border-gray-300 border-solid collapse">
          <thead>
            <tr className="h-5">
              <td className="h-5 w-[50px]"></td>
              <td className="text-xs text-white bg-blue-600 border border-gray-300 border-solid h-18 w-100 whitespace-nowrap">
                <span>THỨ 2</span>
              </td>
              <td className="text-xs text-white bg-blue-600 border border-gray-300 border-solid h-18 w-100 whitespace-nowrap">
                <span>THỨ 3</span>
              </td>
              <td className="text-xs text-white bg-blue-600 border border-gray-300 border-solid h-18 w-100 whitespace-nowrap">
                <span>THỨ 4</span>
              </td>
              <td className="text-xs text-white bg-blue-600 border border-gray-300 border-solid h-18 w-100 whitespace-nowrap">
                <span>THỨ 5</span>
              </td>
              <td className="text-xs text-white bg-blue-600 border border-gray-300 border-solid h-18 w-100 whitespace-nowrap">
                <span>THỨ 6</span>
              </td>
              <td className="text-xs text-white bg-blue-600 border border-gray-300 border-solid h-18 w-100 whitespace-nowrap">
                <span>THỨ 7</span>
              </td>
              <td className="text-xs text-white bg-blue-500 border border-white border-solid border-width-1 w-100">
                <span>THỨ 8</span>
              </td>
              <td className="h-5 w-[50px]"></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 1
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 1
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 1
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 1
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 2
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              {/* <td
              className="relative border border-gray-500 border-solid bg-beige "
              rowSpan="4"
            >
              123 meomeo
            </td> */}
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 2
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 3
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 3
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 4
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 4
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 5
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 5
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 6
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 6
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 7
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 7
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 8
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 8
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 9
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết 9
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết10
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết10
              </td>
            </tr>
            <tr>
              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết11
              </td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>
              <td className="border border-gray-500 border-solid h-22 w-110"></td>

              <td className="text-white bg-blue-500 border border-t border-b border-l border-r border-gray-500 border-solid h-22 w-50">
                Tiết11
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Body;
