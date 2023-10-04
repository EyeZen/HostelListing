import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/property";

const store = configureStore({
    reducer: {
        data: propertyReducer,
    }
});

export default store;