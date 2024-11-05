import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = chatSlice.actions;

export const selectIsLoading = (state) => state.chat.loading;

export default chatSlice.reducer;