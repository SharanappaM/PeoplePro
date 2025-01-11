import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const featchProjectData = createAsyncThunk(
    'emplyoee/featchProjectData',
    async()=>{
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/listProjects`);
        if(!res.ok){
            throw new Error("Falied to fetch project data")
        }

        return res.json()
    }
)


const projectSlice = createSlice({
    name:"project",
    initialState:{
        projects:[],
        loading: false,
        error: null
    },

    reducers:{},

    extraReducers : (bulider)=>{
        bulider
        .addCase(featchProjectData.pending, (state)=>{
            state.loading= true;
            state.error =null;
        })

         .addCase(featchProjectData.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload; // Typo fixed: Correct property name
              })
              .addCase(featchProjectData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
              });
    }
})


export default projectSlice.reducer;