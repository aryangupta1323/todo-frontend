import { createSlice, configureStore } from "@reduxjs/toolkit";

const signSlice = createSlice({
	name: "signup",
	initialState: { isValid: true },
	reducers: {
		unset(state) {
			state.isValid = false;
		},
		set(state) {
			state.isValid = true;
		},
	},
});
const logSlice = createSlice({
	name: "login",
	initialState: { isValid: false },
	reducers: {
		unset(state) {
			state.isValid = false;
		},
		set(state) {
			state.isValid = true;
		},
	},
});
const jwtSlice = createSlice({
	name: "jwt",
	initialState: { value: localStorage.getItem("jwt") },
	reducers: {
		unset(state) {
			state.value = "";
		},
		set(state, action) {
			state.value = action.payload;
		},
	},
});
const store = configureStore({
	reducer: {
		signup: signSlice.reducer,
		login: logSlice.reducer,
		jwt: jwtSlice.reducer,
	},
});
export const signActions = signSlice.actions;
export const logActions = logSlice.actions;
export const jwtActions = jwtSlice.actions;
export default store;
