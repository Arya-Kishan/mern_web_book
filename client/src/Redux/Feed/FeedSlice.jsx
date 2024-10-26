import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    allPosts: [],
};


export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.allPosts = action.payload;
            state.skipQuery = true;
        },
    },
});

export const { setAllPosts } = feedSlice.actions;

export const selectStatus = (state) => state.feed.status;
export const selectGetAllPosts = (state) => state.feed.allPosts;

export default feedSlice.reducer;