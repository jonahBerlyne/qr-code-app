import { createStore } from "@reduxjs/toolkit";
import reducer from "./Reducers";

const store = createStore(reducer);

export default store;