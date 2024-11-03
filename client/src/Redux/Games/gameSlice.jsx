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
    },
});

export const { setGameNotifications } = gameSlice.actions;

export const selectGameNotifications = (state) => state.game.gameNotifications;

export default gameSlice.reducer;