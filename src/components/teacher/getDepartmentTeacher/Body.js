import React from "react";
import { useSelector } from "react-redux";

const Body = () => {
  const teachers = useSelector((state) => state.teacher.teachers?.retObj);
  const departments = useSelector((state) => state.teacher.allDepartment);
  const DepartmentObj = departments?.find(
    (dp) => dp.maKhoa === teachers?.maKhoa
  );

  return (
    <div className="flex-[0.9] mt-10 mx-10 item-center">
      <table className="w-full mx-2 table-auto">
        <thead className="bg-[#E1EEEE] items-center">
          <tr>
            <th className="px-4 py-2">Mã Khoa</th>
            <th className="px-4 py-2">Tên Khoa</th>
            <th className="px-4 py-2">SĐT</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>

        <tbody className="">
          <tr className="justify-center item-center hover:bg-[#EEF5F5]">
            <td className="px-4 py-2 border">{DepartmentObj?.maKhoa}</td>
            <td className="px-4 py-2 border">{DepartmentObj?.tenKhoa}</td>
            <td className="px-4 py-2 border">{DepartmentObj?.sdt}</td>
            <td className="px-4 py-2 border">{DepartmentObj?.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Body;
