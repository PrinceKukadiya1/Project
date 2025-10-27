// export const loginStart = ()=>({
//     type: "LOGIN_START",
// })

// export const loginSuccess = (user)=>({
//     type: "LOGIN_SUCCESS",
//     payload: user,
// })

// export const loginFailure = ()=>({
//     type: "LOGIN_FAILURE",
// })

// // LOGOUT

// export const logout = () => ({
//   type: "LOGOUT",
// });


// LOGIN
export const loginStart = () => ({ type: "LOGIN_START" });
export const loginSuccess = (user) => ({ type: "LOGIN_SUCCESS", payload: user });
export const loginFailure = () => ({ type: "LOGIN_FAILURE" });

// REGISTER
export const registerStart = () => ({ type: "REGISTER_START" });
export const registerSuccess = (user) => ({ type: "REGISTER_SUCCESS", payload: user });
export const registerFailure = () => ({ type: "REGISTER_FAILURE" });

// LOGOUT
export const logout = () => ({ type: "LOGOUT" });
