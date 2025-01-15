import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const sendLoginPostRequest = createAsyncThunk(
    "post/sendLoginPostRequest",
    async (requestData, {rejectWithValue})=>{
        try{
            const response = await axios.post("http://localhost:8787/auth/employeelogin", requestData);
            console.log(response.data, "loginadar");
           
            return response.data;
            
            

        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


const loginPostSlice = createSlice({
    name:"post",
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
          .addCase(sendLoginPostRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(sendLoginPostRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(sendLoginPostRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
})


export const { resetPostState } = loginPostSlice.actions;
export default loginPostSlice.reducer;