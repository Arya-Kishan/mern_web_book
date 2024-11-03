import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gameNotifications: []
};


export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameNotifications: (state, action) => {
            state.gameNotifications = [...state.gameNotifications, action.payload];
        },
        deleteGameNotifications: (state, action) => {
            state.gameNotifications = state.gameNotifications.filter((e) => (e._id !== action.payload._id));
        },
    },
});

export const { setGameNotifications, deleteGameNotifications } = gameSlice.actions;

export const selectGameNotifications = (state) => state.game.gameNotifications;

export default gameSlice.reducer;