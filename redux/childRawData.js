import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URLS } from '../screens/api';
// Create an async thunk to fetch data
export const fetchData = createAsyncThunk(
    'data/fetchData',
    async ({ value, startDate, endDate }) => {
        try {
            // Construct your API endpoint URL with the parameters
            
            const endpoint = `${API_URLS.userDashboard}?value=${value}&startDate=${startDate}&endDate=${endDate}`;

            // Send the GET request using Axios
            const response = await axios.get(endpoint);

            // Return the response data
          
            return response.data;
        } catch (error) {
            // Throw an error if request fails
            throw Error(error.message);
        }
    }
);

// Create a slice
const dataSlice = createSlice({
    name: 'child',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle pending state while fetching data
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Handle fulfilled state after successful data fetch
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        // Handle rejected state if data fetch fails
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

// Export actions and reducer
export const { } = dataSlice.actions;
export default dataSlice.reducer;
