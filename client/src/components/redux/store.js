// import { configureStore } from '@reduxjs/toolkit';
// import employeeReducer from "./features/employee/employeeSlice"


// export const store = configureStore({
//   reducer: {
//     // user: employeeReducer,
//     employee: employeeReducer, // Ensure this matches the slice name
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employee/employeeSlice';
import projectReducer from "./features/employee/projectSlice"
import departmentReducer from "./features/employee/departmentSlice"
import clintsReducer from "./features/employee/clientSlice"
import loginReducer from "./features/login/loginPostSlice"
import adminLoginReducer from "./features/login/adminLoginPostSlice"
export const store = configureStore({
  reducer: {
    employee: employeeReducer, // Ensure this matches the slice name
    project : projectReducer,
    department : departmentReducer,
    clints: clintsReducer,
    post: loginReducer,
    postForAdmin: adminLoginReducer,
  },
});
