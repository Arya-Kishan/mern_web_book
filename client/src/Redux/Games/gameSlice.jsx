import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boxes: [{ num: 0, value: '' }, { num: 1, value: '' }, { num: 2, value: '' }, { num: 3, value: '' }, { num: 4, value: '' }, { num: 5, value: '' }, { num: 6, value: '' }, { num: 7, value: '' }, { num: 8, value: '' }]
};


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setBoxes: (state, action) => {
            state.boxes = action.payload;
        },
    },
});

export const { setBoxes } = gameSlice.actions;

export const selectBoxes = (state) => state.game.boxes;

export default gameSlice.reducer;