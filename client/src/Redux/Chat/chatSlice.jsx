import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSocketConnected: "connecting",
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setIsSocketConnected: (state, action) => {
            state.isSocketConnected = action.payload;
        },
    },
});

export const { setIsSocketConnected } = chatSlice.actions;

export const selectIsSocketConnected = (state) => state.chat.isSocketConnected;

export default chatSlice.reducer;