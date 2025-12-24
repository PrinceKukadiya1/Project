// import axios from "axios";
// import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

// export const login = async (user, dispatch) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.post("http://localhost:3000/api/auth/login", user);
//     dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };


import api from "../api/axios";

export const login = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await api.post("/api/auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    return res.data; // 🔥 REQUIRED
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE" });
    throw err;
  }
};
