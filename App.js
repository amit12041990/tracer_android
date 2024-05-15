// App.js

import React from 'react';
import {Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store configuration
import Dashbords from './screens/Dashbords';


//screens Admin
import ProgressMapScreen from './screens/ProgressMapScreen';
import EmotionMapScreen from './screens/EmotionMapScreen';
import AdminDashboard from './screens/AdminDashboard';
import LoginScreen from './screens/LoginScreens';
import ScreenTimeMapScreen from './screens/ScreenTimeMapScreen';
import InterestMapScreen from './screens/InterestMapScreen';

//screen Child
import AppsScreen from './screens/AppsScreen';
import ChromeViewScreen from './screens/ChromeScreen';
import YoutubeViewScreen from './screens/YoutubeSreen';
const Stack = createNativeStackNavigator();


const App = () => {
    return (
        <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' >
                <Stack.Screen name='Home' component={LoginScreen}/>
             {/*    <Stack.Screen name='Dashboard' component={Dashbords}/> */}
                <Stack.Screen name='Dashboard' component={AdminDashboard} options={{headerShown:false}}/>
                <Stack.Screen name='WordCloud' component={InterestMapScreen}/>
                <Stack.Screen name='ScreenChart' component={ScreenTimeMapScreen}/>
                <Stack.Screen name='ProgressChart' component={ProgressMapScreen}/>
                <Stack.Screen name='EmotionChart' component={EmotionMapScreen}/>
                <Stack.Screen name='Child' component={AppsScreen}/>
                <Stack.Screen name='Chrome' component={ChromeViewScreen}/>
                <Stack.Screen name='Youtube' component={YoutubeViewScreen}/>
            </Stack.Navigator>
         </NavigationContainer>
        </Provider>
    );
};

export default App;




