import SchoolIcon from "@mui/icons-material/School";
import React, { useEffect, useState } from "react";
import PTIT from "./ptit.png";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import decode from "jwt-decode";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useDispatch } from "react-redux";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink, useNavigate } from "react-router-dom";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-white hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "svg: flex items-center px-5 gap-3 text-red font-bold hover:text-black  transition-all duration-200 ease-in-out capitalize hover:bg-gray-200  py-2 my-1";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/adminLogin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("admin")));
  }, [navigate]);

  return (
    <div className="flex-[0.2] w-[268px] h-full">
      <div className="ml-1  pt-4 space-y-8  h-full bg-[#04605E]">
        <div>
          <img src={PTIT} alt="" className="mr-3 h-[74px] ml-20 " />
        </div>
        <div className="" style={{ marginTop: 0 }}>
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HomeIcon className="" />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
        </div>
        <div className="mt-0" style={{ marginTop: 0 }}>
          <NavLink
            to="/admin/getdepartmentall"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <AssignmentIndIcon className="" />
            <h1 className="font-normal">Khoa</h1>
          </NavLink>
          <NavLink
            to="/admin/allUnit"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <SchoolIcon className="" />
            <h1 className="font-normal">Lớp</h1>
          </NavLink>
          <NavLink
            to="/admin/student"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <GroupIcon className="" />

            {/* <svg
              width={30}
              height={36}
              viewBox="0 0 74 74"
              // fill="#090909"
              xmlns="http://www.w3.org/2000/svg"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <g clipPath="url(#clip0_29_47)">
                <path
                  d="M29.9403 26.9012C31.7088 26.9012 33.1425 25.4675 33.1425 23.6989C33.1425 21.9304 31.7088 20.4967 29.9403 20.4967C28.1717 20.4967 26.738 21.9304 26.738 23.6989C26.738 25.4675 28.1717 26.9012 29.9403 26.9012Z"
                  fill="#fff"
                />
                <path
                  d="M36.4512 54.7125L35.281 46.1164C35.2637 45.9891 35.2327 45.8641 35.1885 45.7434L33.5171 41.1868V37.4086C32.3502 37.9719 30.9556 37.4876 30.3845 36.3291L28.0772 31.6341L31.3396 35.529C32.0266 36.3491 33.3357 36.1455 33.7457 35.1629L36.0015 29.7561C36.3044 29.0302 35.9614 28.1963 35.2356 27.8934C34.5098 27.5905 33.6758 27.9336 33.3729 28.6593L32.019 31.9045L30.2605 29.8052L31.2437 30.5266L32.3089 27.9837H27.4963C26.4652 27.9837 25.6031 28.7055 25.3863 29.6712V29.4354C25.3863 28.1037 24.3067 27.0241 22.975 27.0241C21.6434 27.0241 20.5637 28.1036 20.5637 29.4354V32.6611H19.8841C19.4212 32.6611 19.046 33.0363 19.046 33.4992V36.1813C19.046 36.6442 19.4212 37.0194 19.8841 37.0194H20.5637C20.5637 38.6742 21.843 39.7936 23.2696 39.7936H25.3332V41.2454H25.335L25.104 46.7646L22.0099 54.2747C21.6353 55.1837 22.0686 56.2242 22.9777 56.5987C23.8869 56.9733 24.9273 56.5398 25.3017 55.631L28.5155 47.8308C28.5945 47.6388 28.6395 47.4345 28.6481 47.2271C28.9135 40.8858 28.8966 41.3165 28.8966 41.2455H29.7462L31.7792 46.7882L32.9233 55.1929C33.056 56.1681 33.9544 56.8493 34.9272 56.7167C35.9016 56.5839 36.5838 55.6866 36.4512 54.7125Z"
                  fill="#fff"
                />
                <path
                  d="M48.4263 23.6712C50.1949 23.6712 51.6286 22.2375 51.6286 20.4689C51.6286 18.7004 50.1949 17.2667 48.4263 17.2667C46.6578 17.2667 45.2241 18.7004 45.2241 20.4689C45.2241 22.2375 46.6578 23.6712 48.4263 23.6712Z"
                  fill="#fff"
                />
                <path
                  d="M54.9375 51.4823L53.7673 42.8862C53.7499 42.7589 53.7189 42.6339 53.6747 42.5133L52.0034 37.9567V36.4449C51.3632 36.2413 47.6844 35.0717 46.9444 34.8363C46.0703 34.5583 45.5373 33.7079 45.6255 32.8303L46.1464 27.6248L46.8593 32.6554C46.9361 33.1972 47.3164 33.647 47.8378 33.8128L52.5069 35.2974C53.2562 35.5356 54.0572 35.1215 54.2955 34.3718C54.5338 33.6222 54.1194 32.8214 53.3699 32.5831L49.5537 31.3696L48.9664 27.2253L50.184 30.2626L52.0034 30.8411V26.9168C52.0034 25.7221 51.0349 24.7536 49.8402 24.7536H45.9826C44.9514 24.7536 44.0893 25.4753 43.8725 26.4411V26.2052C43.8725 24.8735 42.7929 23.7939 41.4612 23.7939C40.1294 23.7939 39.0499 24.8734 39.0499 26.2052V30.1787H38.4166C37.9537 30.1787 37.5784 30.5539 37.5784 31.0168V33.3517C37.5784 33.8146 37.9537 34.1899 38.4166 34.1899H39.071C39.2349 35.5274 40.3739 36.5634 41.7558 36.5634H43.8194V38.0152H43.8212L43.5902 43.5344L40.4961 51.0444C40.1216 51.9534 40.5549 52.9939 41.4639 53.3685C42.3738 53.7433 43.4137 53.3089 43.7879 52.4007L47.0016 44.6005C47.0807 44.4086 47.1256 44.2042 47.1343 43.9968C47.3997 37.6548 47.3827 38.0866 47.3827 38.0152H48.2324L50.2654 43.558L51.4095 51.9626C51.5423 52.9378 52.4407 53.6191 53.4134 53.4864C54.3879 53.3537 55.0701 52.4564 54.9375 51.4823Z"
                  fill="#fff"
                />
              </g>
              <defs>
                <clipPath id="clip0_29_47">
                  <rect
                    width="39.4667"
                    height="39.4667"
                    fill="#090909"
                    transform="translate(17.2667 17.2667)"
                  />
                </clipPath>
              </defs>
            </svg> */}
            <h1 className="font-normal">Sinh Viên</h1>
          </NavLink>

          <NavLink
            to="/admin/teacher"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <GroupIcon className="" />
            <h1 className="font-normal">Giảng Viên</h1>
          </NavLink>

          <NavLink
            to="/admin/allcourse"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <SchoolIcon className="" />

            <h1 className="font-normal">Lớp Tín chỉ</h1>
          </NavLink>
          <NavLink
            to="/admin/coursedetail"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <SchoolIcon className="" />

            <h1 className="font-normal">Chi tiết lớp tín chỉ</h1>
          </NavLink>
        </div>
        <div className="" style={{ marginTop: 0 }}>
          <NavLink
            to="/admin/allscore"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <CreditScoreIcon className="" />
            <h1 className="font-normal">Điểm</h1>
          </NavLink>
        </div>
        <div className="" style={{ marginTop: 0 }}>
          <NavLink
            to="/admin/allsubject"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <MenuBookIcon className="" />
            <h1 className="font-normal">Môn học</h1>
          </NavLink>
        </div>
        <div className="" style={{ marginTop: 0 }}>
          <NavLink
            to="/admin/thongke"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <BarChartIcon className="" />
            <h1 className="font-normal">Thống kê điểm</h1>
          </NavLink>

          <NavLink
            to="/admin/updatepassword"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            {/* <BarChartIcon className="" /> */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h1 className="font-normal">Đổi mật khẩu</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
