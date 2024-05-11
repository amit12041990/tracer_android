import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URLS } from '../screens/api';

// Define the initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Define the asynchronous thunk function to fetch data with three arguments
export const fetchDataByArgs = createAsyncThunk(
  'data/fetchDataByArgs',
  async ({ value, startDate, endDate }, { getState, dispatch }) => {
    try {
     
      if (!startDate || !endDate || !value) {
        console.error('heyeye')
        throw new Error('Start date or end date is undefined');
      }
      console.log(`${API_URLS.userDashboard}?value=${value}&startDate=${startDate}&endDate=${endDate}`)
      const response = await axios.get(`${API_URLS.userDashboard}?value=${value}&startDate=${startDate}&endDate=${endDate}`);
      const data = response.data;
   
      return data;
    } catch (error) {
      
      throw error;
    }
  }
);

// Create a slice for the data
const dataSlice = createSlice({
  name: 'rawDataSearch',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataByArgs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataByArgs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update state with fetched data
      })
      .addCase(fetchDataByArgs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk action creator
export { fetchDataByArgs as fetchDataByArgsAction };

// Export the reducer and additional action creator
export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
