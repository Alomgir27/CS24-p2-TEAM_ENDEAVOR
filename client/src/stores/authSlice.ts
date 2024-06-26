import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface AuthState {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
}



const initialState: AuthState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
    token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));

        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // window.location.reload();
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
