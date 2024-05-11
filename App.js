// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './screens/LoginScreens';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store'; // Import your Redux store configuration
import { Dashboard } from './screens/Dashbords'


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: true }}>
                    
                    <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                    


                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;




