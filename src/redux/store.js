import { legacy_createStore as createStore } from "redux";
import moviesReducer from "./moviesReducer";

const store = createStore(moviesReducer);

export default store;
