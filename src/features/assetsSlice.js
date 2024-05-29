import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAssets = createAsyncThunk(
    'assets/fetchAssets',
    async (companyId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/companies/${companyId}/assets`);
        return response.data;
    }
);

const assetsSlice = createSlice({
    name: 'assets',
    initialState: {
        assets: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.assets = action.payload;
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default assetsSlice.reducer;
