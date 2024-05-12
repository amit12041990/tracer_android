// App.js

import React from 'react';
import {Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store configuration
import Dashbords from './screens/Dashbords';
import AdminDashboard from './screens/AdminDashboard';
import LoginScreen from './screens/LoginScreens';
import ProgressMapScreen from './screens/ProgressMapScreen';

//screens components
import ScreenTimeMapScreen from './screens/ScreenTimeMapScreen';
import InterestMapScreen from './screens/InterestMapScreen';
const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={LoginScreen}/>
                <Stack.Screen name='Dashboard' component={AdminDashboard}/>
                <Stack.Screen name='WordCloud' component={InterestMapScreen}/>
                <Stack.Screen name='ScreenChart' component={ScreenTimeMapScreen}/>
                <Stack.Screen name='ProgressChart' component={ProgressMapScreen}/>
            </Stack.Navigator>
         </NavigationContainer>
        </Provider>
    );
};

export default App;




