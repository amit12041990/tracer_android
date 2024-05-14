// LoginScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker } from '@react-native-picker/picker'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URLS } from './api';


const LoginScreen = () => {
    const [err,setErr] =useState(null)
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    useEffect(() => {
        // Check if the user is already logged in
        const checkLoginStatus = async () => {
            const isLogin = await AsyncStorage.getItem('isLoggedIn');
            if (isLogin === 'true') {
                const userRole = await AsyncStorage.getItem('role');
                navigation.navigate(userRole === 'admin' ? 'Dashboard' : 'Child');
            }
        };

        checkLoginStatus();
    }, [navigation]);
    const handleLogin = async() => {
        try {
            const response = await axios.post(API_URLS.userLogin, {
                username,
                password,
                role,
            });
    
            if (response.data.userID !== undefined) {
                alert(response.data.userID)
                await AsyncStorage.setItem('isLoggedIn', 'true');
                await AsyncStorage.setItem('userID', response.data.userID);
                await AsyncStorage.setItem('role', response.data.userType); // Store the user's role
                navigation.navigate(role === 'admin' ? 'Dashboard' : 'Child');
                
               
            }
            else if(response.data.user === 'not found') {
                setErr('user not found')
            }
            else{
                setErr(JSON.stringify(response.data))
               
            }
        } catch (error) {
            setErr('Login failed:', error.response.data.message)
            console.error('Login failed:', error.response.data.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Login</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="child name or parrent email"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="parrent Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Picker
                    selectedValue={role}
                    onValueChange={(itemValue) => setRole(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Admin" value="admin" />
                </Picker>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text>
             Use email and password to admin dashboard
                </Text>
                <Text>
                Use Childname and parent password to child login
                </Text>
                {
                    err && (
                        <Text style={{color:'red'}}>{err}</Text>
                    )
                }
                
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Adjust background color as needed
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    loginButton: {
        backgroundColor: '#3498db', // Adjust button color as needed
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff', // Adjust text color as needed
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
