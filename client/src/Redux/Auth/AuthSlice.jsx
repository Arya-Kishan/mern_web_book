import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosCheckUser, createUser, loginUser } from './AuthApi';
import { toast } from "react-toastify"

const initialState = {
    status: 'idle',
    loginLoader: false,
    loggedInUser: null,
    userId: null,
    googleUserDetails: null,
    preCheckUser: false,
};

export const registerUserAsync = createAsyncThunk(
    'auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await createUser(formData, '/user/signup');
            return response.data;
        } catch (error) {
            return response.data;
        }
    }
);

export const loginUserAsync = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await loginUser(formData, '/user/login');
            return response;
        } catch (error) {
            toast(error.message)
            rejectWithValue(null)
            return response.data;
        }
    }
);

export const checkUserWithJwtAsync = createAsyncThunk(
    'auth/checkUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosCheckUser(formData, '/user/check');
            return response;
        } catch (error) {
            console.log(error);
            rejectWithValue(null)
            return response;
        }
    }
);

export const guestUserAsync = createAsyncThunk(
    'auth/guestUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await loginUser({ email: 'arya12345kishan@gmail.com', password: "arya" }, '/user/login');
            return response;
        } catch (error) {
            toast("NO USER EXIST")
            rejectWithValue(null)
            return response.data;
        }
    }
);



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.loggedInUser = null;
        },
        setOtherUserDetail: (state) => {
            state.otherUserDetail = null;
        },
        setGoogleUserDetails: (state, action) => {
            state.googleUserDetails = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // RESITERING USER
            .addCase(registerUserAsync.pending, (state) => {
                state.status = 'loading';
                state.loginLoader = true;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loginLoader = false;
                state.userId = action.payload._id;
                state.loggedInUser = action.payload;
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.loginLoader = false;
                state.loggedInUser = null;
            })
            // LOGIN USER
            .addCase(loginUserAsync.pending, (state) => {
                state.status = 'loading';
                state.loginLoader = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
                state.loginLoader = false;
                state.status = 'idle';
                state.userId = action.payload._id;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.loginLoader = false;
                state.loggedInUser = null;
            })
            // GUEST USER
            .addCase(guestUserAsync.pending, (state) => {
                state.status = 'loading';
                state.loginLoader = true;
            })
            .addCase(guestUserAsync.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
                state.loginLoader = false;
                state.status = 'idle';
                state.userId = action.payload._id;
            })
            .addCase(guestUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.loginLoader = false;
                state.loggedInUser = null;
            })
            // CHECKING USER WITH JWT TOKEN
            .addCase(checkUserWithJwtAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkUserWithJwtAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.preCheckUser = true;
                state.loggedInUser = action.payload;
                state.userId = action.payload._id;
            })
            .addCase(checkUserWithJwtAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.preCheckUser = true;
                state.loggedInUser = null;
            })
    },
});

export const { logoutUser, setOtherUserDetail, setGoogleUserDetails } = authSlice.actions;

export const selectStatus = (state) => state.auth.status;
export const selectLoginLoader = (state) => state.auth.loginLoader;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectPrecheckUser = (state) => state.auth.preCheckUser;
export const selectUserId = (state) => state.auth.userId;
export const selectGoogleUserDetails = (state) => state.auth.googleUserDetails;

export default authSlice.reducer;