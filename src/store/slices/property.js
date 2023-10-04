import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
    name: "properties",
    initialState: {
        cities: [],
        properties: [],
        loading: false,
        error: null,
    },
    reducers: {
        dataLoadStart(state) {
            state.loading = true;
            state.error = null;
        },
        dataLoadSuccess(state, { payload }) {
            const { cities, properties } = payload;
            state.loading = false;
            if(cities) state.cities = cities;
            if(properties) state.properties = properties;
        },
        dataLoadFailure(state, { payload }) {
            state.loading = false;
            state.error = payload;
        },

        markSaved(state, { payload }) {
            const { id, saved = true } = payload;
            if(state.properties) {
                const idx = state.properties.findIndex(item => item.id === id);
                if(idx >= 0) {
                    state.properties[idx].saved = saved;
                }
            }
        },
    }
});

export const { dataLoadStart, dataLoadSuccess, dataLoadFailure, markSaved } = propertySlice.actions;
export const selectCitiesData = (state) => state.data.cities;
export const selectPropertiesData = (state) => state.data.properties;
export const selectLoading = (state) => state.data.loading;
export const selectError = (state) => state.data.error;

export default propertySlice.reducer;