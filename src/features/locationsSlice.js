import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async (companyId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/companies/${companyId}/locations`);
        return response.data;
    }
);

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        locations: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default locationsSlice.reducer;
