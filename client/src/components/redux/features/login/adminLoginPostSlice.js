import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const sendLoginPostRequestForAdmin = createAsyncThunk(
    "post/sendLoginPostRequestForAdmin",
    async (requestData, {rejectWithValue})=>{
        try{
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/auth/adminlogin`, requestData);
       
          
           
            return response.data;
            
            
            

        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


const adminLoginPostSlice = createSlice({
    name:"postForAdmin",
    initialState:{
        loading : false,
        data: null,
        error: null
    },
    reducers: {
        resetPostState: (state) => {
          state.loading = false;
          state.data = null;
          state.error = null;
        },
      },
      extraReducers: (builder) => {
        builder
          .addCase(sendLoginPostRequestForAdmin.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(sendLoginPostRequestForAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(sendLoginPostRequestForAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
})


export const { resetPostState } = adminLoginPostSlice.actions;
export default adminLoginPostSlice.reducer;