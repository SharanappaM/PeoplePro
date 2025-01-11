import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDepartmentData = createAsyncThunk(
   "emplyoee/fetchDepartmentData",
   async()=>{
    const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listDepartments`)
    if(!response.ok){
        throw new Error("failed to fetch department data")
    }
    return response.json()
   }
)


const departmentSlice = createSlice({
    name: "department",
    initialState:{
        departmentList : [],
        loading : false,
        error : null,

    },

    reducers:{},

    extraReducers:(bulider)=>{
        bulider
        .addCase(fetchDepartmentData.pending, (state)=>{
            state.loading= true,
            state.error = null
        })

        .addCase(fetchDepartmentData.fulfilled, (state,action)=>{
            state.loading = false ,
            state.departmentList=  action.payload

        })

        .addCase(fetchDepartmentData.rejected, (state, action)=>{
            state.loading= false,
            state.error= action.error.message
        })
    }
})



export default departmentSlice.reducer;