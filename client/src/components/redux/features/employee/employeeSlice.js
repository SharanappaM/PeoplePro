import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch employee data
export const fetchEmployeesData = createAsyncThunk(
  'employee/fetchEmployeesData',
  async () => {
    const response = await fetch("http://localhost:8787/auth/listEmployees");
    if (!response.ok) { // Fix the condition to check for errors
      throw new Error('Failed to fetch employee data');
    }
    return response.json(); // Return the response JSON
  }
);

// Employee slice
const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [], // Typo fixed: Correct property name
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesData.pending, (state) => {
        state.loading = true;
        state.error = null; // Typo fixed: 'nul' -> 'null'
      })
      .addCase(fetchEmployeesData.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload; // Typo fixed: Correct property name
      })
      .addCase(fetchEmployeesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message
      });
  },
});

export default employeeSlice.reducer;
