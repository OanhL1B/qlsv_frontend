import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Spinner from "../../utils/Spinner";
import React, { useEffect, useState } from "react";
import { userLogin } from "../../redux/actions/loginActions";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);
  // đăng nhập chung cho cả 3 thằng
  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userLogin({ username: username, password: password }, navigate));
  };
  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div>
        <form
          onSubmit={login}
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } w-96 bg-white flex flex-col items-center justify-center duration-1000  space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className="text-3xl font-semibold text-gray-800">Đăng Nhập</h1>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <div className="bg-white rounded-lg w-[16rem] flex  items-center">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                name="username"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>

            <div className="bg-white rounded-lg w-[16rem] flex  items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                name="password"
                type={showPassword ? "text" : "password"}
                className="relative block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter your password"
              />
              <div className="absolute ml-[224px] mt-2">
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-32 py-1 text-base text-white duration-150 rounded-lg hover:scale-105 bg-primary "
          >
            Login
          </button>
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
          {error.message ? (
            <p className="text-red-500">{error.message}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Login;

// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import Spinner from "../../utils/Spinner";
// import React, { useEffect, useState } from "react";
// import { userLogin } from "../../redux/actions/loginActions";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Input from "../util/Input";
// import { useForm } from "react-hook-form";

// const schema = yup
//   .object({
//     username: yup.string().required("This field is reduired"),
//     password: yup
//       .string()
//       .required("This field is required")
//       .min(8, "Password must be 8 character"),
//   })
//   .required();
// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const store = useSelector((state) => state);
//   const [error, setError] = useState({});

//   // form validation

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     // bắt lỗi
//     // resolver các giá trị đầu vào theo schema đã định nghĩa
//     resolver: yupResolver(schema),
//     // để mode để khi nào submit thì nó mới bắt lỗi nè
//     mode: "onSubmit",
//   });
//   useEffect(() => {
//     if (store.errors) {
//       setError(store.errors);
//     }
//   }, [store.errors]);

//   const login = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     dispatch(userLogin({ username: username, password: password }, navigate));
//   };
//   useEffect(() => {
//     if (store.errors) {
//       setLoading(false);
//       setUsername("");
//       setPassword("");
//     }
//   }, [store.errors]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-white">
//       <div>
//         <form
//           onSubmit={handleSubmit(login)}
//           className={`${
//             loading ? "h-[27rem]" : "h-96"
//           } w-96 bg-white flex flex-col items-center justify-center duration-1000  space-y-6 rounded-3xl shadow-2xl`}
//         >
//           <h1 className="text-3xl font-semibold text-gray-800">Đăng Nhập</h1>

//           <div className="space-y-1">
//             <label className="block text-sm font-semibold text-gray-800">
//               Username
//             </label>
//             <div className="bg-white rounded-lg w-[16rem] flex  items-center">
//               <Input
//                 control={control}
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//                 name="username"
//                 type="text"
//                 required
//                 className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                 placeholder="Enter your username"
//                 error={errors.username?.message}
//               />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <label
//               htmlFor="password"
//               className="block text-sm font-semibold text-gray-800"
//             >
//               Password
//             </label>

//             <div className="bg-white rounded-lg w-[16rem] flex  items-center">
//               <Input
//                 control={control}
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 required
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 className="relative block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                 placeholder="Enter your password"
//                 error={errors.password?.message}
//               />
//               <div className="absolute ml-[224px] mt-2">
//                 {showPassword ? (
//                   <VisibilityIcon
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="cursor-pointer"
//                   />
//                 ) : (
//                   <VisibilityOffIcon
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="cursor-pointer"
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="flex items-center justify-center w-32 py-1 text-base text-white duration-150 rounded-lg hover:scale-105 bg-primary "
//           >
//             Login
//           </button>
//           {loading && (
//             <Spinner
//               message="Logging In"
//               height={30}
//               width={150}
//               color="#ffffff"
//               messageColor="#fff"
//             />
//           )}
//           {error.message ? (
//             <p className="text-red-500">{error.message}</p>
//           ) : null}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
