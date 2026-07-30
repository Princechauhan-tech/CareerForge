import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        // Login Start
        loginStart: (state) => {
            state.loading = true;
        },

        // Login Success
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        // Login Failure
        loginFailure: (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },

        // Logout
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
        },

        // Set Credentials (used after successful login or page refresh)
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },

        // Clear Auth State
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setCredentials,
    setLogout,
} = authSlice.actions;

export default authSlice.reducer;