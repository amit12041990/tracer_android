import { configureStore } from '@reduxjs/toolkit';
import userReducer from './childSlice';
import childReducer from './childRawData';
import wordcloudReducer from './wordCloudSlice'
import fetchDataByArgs from './RawDataSearch'


export default configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        child: childReducer,
        wc:wordcloudReducer,
        rawdata:fetchDataByArgs,
    },
});
