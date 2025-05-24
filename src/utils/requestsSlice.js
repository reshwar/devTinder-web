import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequests:(state,action)=>{
            console.log("action.payload", action.payload)
            console.log("state.requests", state)
            return state.filter(req =>req._id !== action.payload)
        }
    }
})

export const {addRequests,removeRequests } = requestsSlice.actions
export default requestsSlice.reducer