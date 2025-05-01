import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addUser:(state,action)=>{
            console.log("action vall",action)
            return action.payload.data;
        },
        removeUser:(state,action)=>{
            return null
        }
    }
});

export const {addUser,removeUser} = userSlice.actions;
export default userSlice.reducer

