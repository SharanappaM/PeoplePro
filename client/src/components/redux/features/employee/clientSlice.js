import { red } from "@mui/material/colors";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchClientData = createAsyncThunk(
    "emplyoee/fetchClientData",
    async ()=>{
        const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listClients`)
        if(!response.ok){
            throw new Error("failed to fetch client data")
        }

        return response.json()
    },



)



const clientSlice = createSlice({
    name:"clients",
    initialState:{
        clientList :[],
        loading :false,
        error:null
    },
    reducers :{},

    extraReducers :(builder) =>{
        builder
        .addCase(fetchClientData.pending, (state)=>{
            state.loading= true,
            state.error= null
        })

        .addCase(fetchClientData.fulfilled, (state, action)=>{
            state.loading= false,
            state.clientList=action.payload
        })
        .addCase(fetchClientData.rejected, (state, action)=>{
            state.loading= false,
            state.error= action.error.message
        })
    }

})



export default clientSlice.reducer;