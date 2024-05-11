const Stack = createNativeStackNavigator();
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    View,
    Text,
    Pressable,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AppsScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
                const role = await AsyncStorage.getItem('role');

                if (isLoggedIn === 'true' && role == 'user') {
                    console.log(role)
                    setIsUserLoggedIn(true);
                }
                else if (isLoggedIn === 'true' && role == 'admin') {
                    navigation.navigate('Dashboard');
                }
                else {
                    navigation.replace('Login');
                }
            } catch (error) {
                console.error('Error checking login status:', error.message);
            }
        };

        checkLoginStatus();
    }, [isFocused]);
    const handleNavigateToChromeScreen = () => {
        // Navigate to 'ChromeScreen'
        navigation.navigate('Chrome');
    };

    const handleNavigateToYoutubeScreen = () => {
        // Navigate to 'YoutubeScreen'
        navigation.navigate('Youtube');
    };
    const handleLogout = async () => {
        try {
            // Clear user's login status in AsyncStorage
            await AsyncStorage.removeItem('isLoggedIn');

            // Navigate to the login screen
            navigation.replace('Login');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };
    const handlePress = async (item) => {
        if (item === 'Chrome') {
            navigation.navigate('Chrome');
        } else if (item === 'Youtube') {
            navigation.navigate('Youtube');

        } else if (item === 'logout') {
            try {
                // Clear user's login status in AsyncStorage
                await AsyncStorage.removeItem('isLoggedIn');

                // Navigate to the login screen
                navigation.replace('Login');
            } catch (error) {
                console.error('Error during logout:', error.message);
            }
        }
        else {
            console.log('nothing')
        }
    }
    if (isUserLoggedIn) {
        return (
            <ImageBackground source={require('../assets/bodybg.jpg')}>
                <View style={styles.main}>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, justifyContent: 'center', alignSelf: 'center', }}>
                        <TouchableOpacity onPress={() => handlePress('Chrome')}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 5,



                                }}
                            >
                                <Image
                                    source={require('../assets/icons/chrm.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 8, fontWeight: '400' }}>Chrome</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('Youtube')}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 5,


                                }}
                            >
                                <Image
                                    source={require('../assets/icons/yt.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 8, fontWeight: '400' }}>Youtube</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('pintrest')}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 5,


                                }}
                            >
                                <Image
                                    source={require('../assets/icons/pint.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 8, fontWeight: '400' }}>Pintrest</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('hotstar')}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 5,


                                }}
                            >
                                <Image
                                    source={require('../assets/icons/hotstart.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 8, fontWeight: '400' }}>Hotstart</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('hotstar')}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 5,


                                }}
                            >
                                <Image
                                    source={require('../assets/icons/hotstart.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 8, fontWeight: '400' }}>Hotstart</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePress('logout')}>
                            <View
                                style={{
                                    width: 60,
                                    height: 60,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: 5,


                                }}
                            >
                                <Image
                                    source={require('../assets/icons/logout.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text style={{ fontSize: 8, fontWeight: '400' }}>logout</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.logoutButton}>
                        <Text style={styles.logoutText}>logout</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    } else {
        null;
    }
}

const styles = StyleSheet.create({
    main: {
        height: windowHeight, width: windowWidth,justifyContent:"center",TextAlignt:"center",alignSelf: 'center', // Center horizontally,
    },
     container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  rectangle: {
    width: 78.09,
    height: 63.87,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: '#FFFBFB',
  },
  image: {
    width: 57.78,
    height: 56.24,
    left: 11.71,
    top: 3.80,
    position: 'absolute',
  },
  textContainer: {
    width: 78.09,
    height: 12.16,
    left: 0,
    top: 63.84,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 10,
  
    fontWeight: '400',
    textAlign: 'center',
  },

})
export default AppsScreen;