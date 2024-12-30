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

export const store = configureStore({
  reducer: {
    employee: employeeReducer, // Ensure this matches the slice name
  },
});
