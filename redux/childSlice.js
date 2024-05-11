import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URLS } from '../screens/api';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    try {
        const userId = await AsyncStorage.getItem('userID');
        const response = await axios.get(`${API_URLS.userList}?id=${userId}`);
        console.log('here is users',response.data)
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setError, setLoading } = userSlice.actions;
export default userSlice.reducer;
