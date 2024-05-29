import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/companies`);
        return response.data;
    }
);

const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companies = action.payload;
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default companiesSlice.reducer;
