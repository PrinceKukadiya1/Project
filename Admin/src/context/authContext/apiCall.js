// import axios from "axios";
// import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

// export const login = async (user, dispatch) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.post("http://localhost:3000/api/auth/login", user);
//     res.data.isAdmin && dispatch(loginSuccess(res.data));
//   } catch (err) {
//     dispatch(loginFailure());
//   }
// };


import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./AuthActions";

// LOGIN
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// REGISTER
export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3000/api/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};
