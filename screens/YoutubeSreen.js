import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URLS } from './api';


const YoutubeViewScreen = () => {
    
    const webViewRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [search_query, set_search_query] = useState('')
    const [user_comment, set_user_comment] = useState('')
    const [timer, setTimer] = useState(0);
    const [time, setTime] = useState(null)
    const [intervalId, setIntervalId] = useState(null);
    const [userId, setUserId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                
                const userId = await AsyncStorage.getItem('userID');
                setUserId(userId);

                
            } catch (error) {
                console.error('Error checking login status:', error.message);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [intervalId]);

   const handleNavigationStateChange = (newNavState) => {
       if (newNavState && newNavState.url) {
           const currentDate = new Date();

           const currentYear = currentDate.getFullYear();
           const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so we add 1
           const currentDay = currentDate.getDate();
           const currentHours = currentDate.getHours();
           const currentMinutes = currentDate.getMinutes();
           const currentSeconds = currentDate.getSeconds();
           setTime(`Current Time: ${currentHours}:${currentMinutes}:${currentSeconds}`)
          

        clearInterval(intervalId); // Clear the interval when the navigation state changes
        setTimer(0); // Reset the timer to 0
        setVideoUrl('');

        if (newNavState.url.startsWith('https://www.youtube.com/watch')) {
            const newIntervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setIntervalId(newIntervalId);
        } else {
            // Send data to the server or perform other actions
            
            sendToServer(videoUrl,timer,userId)
            
        }
    }
};

    const handleMessage = async (event) => {
        const eventData = JSON.parse(event.nativeEvent.data);
        if (eventData.eventType === 'videoData') {
            const { url, elapsedTime } = eventData;
            setVideoUrl(url);
            setTimer(elapsedTime);
        }
      



        // Log received data to check the structure
       

        // Handle different event types
        switch (eventData.type) {
            case 'change':
                
                if (eventData.fieldName === 'textarea') {

                    
                    set_user_comment(eventData.value)
                    if (user_comment != '') {
                        if (isSubmitting) { return true }
                        setIsSubmitting(true)
                        try {
                            sendToServer_Comment(eventData.value, videoUrl, userId)
                            set_user_comment('')

                        } catch (error) {
                            console.log(error)
                        }
                        finally {
                            setIsSubmitting(false);
                        }
                       

                    }
                    

                } else if (eventData.type === 'input') {
                    sendToServer_Query(eventData.value, userId)
                }
                else {
                   // console.log('nothing happen')
                }
                break;
            case 'input':
             
                break;
            case 'formSubmit':
                
                break;
           
            default:
                break;
        }

    
    };

    const injectJavaScriptOnLoad = `

  var elapsedTime = 0;
    var intervalId = null;
    var currentUrl = window.location.href;

    function postVideoData() {
        const videoUrl = window.location.href;
        window.ReactNativeWebView.postMessage(
            JSON.stringify({
                eventType: 'videoData',
                url: videoUrl,
                elapsedTime: elapsedTime
            })
        );
    }

    function startTimer() {
        intervalId = setInterval(() => {
            elapsedTime++;
            postVideoData();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(intervalId);
    }

    // Function to check URL changes and reset timer if URL changes
    function checkUrlChange() {
        var newUrl = window.location.href;
        if (newUrl !== currentUrl) {
            stopTimer();
            elapsedTime = 0; // Reset elapsedTime
            currentUrl = newUrl;
            startTimer();
        }
    }

    // Start the timer initially
    startTimer();

    // Listen for URL changes every second
    setInterval(checkUrlChange, 1000);
    setInterval(function() {
        let currentUrl = window.location.href;
   var buttons = document.querySelectorAll('button');



    
    var commentFields = document.querySelectorAll('textarea');
    commentFields.forEach(function(inputField) {
      inputField.addEventListener('change', function() {
        let inputValue = inputField.value;
         window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'change',
            fieldName: 'textarea',
            value: event.target.value,
            url:currentUrl

        }));
        
      });
    });
  }, 1000);
     const inputFields = document.querySelectorAll('input');

inputFields.forEach(field => {
    field.addEventListener('input', (event) => {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'input',
            fieldName: field.name,
            value: event.target.value
        }));
    });

    field.addEventListener('change', (event) => {
        window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'change',
            fieldName: field.name,
            value: event.target.value
        }));
    });
    
   

});

    `;
    const sendToServer_Comment = async (comment,url,uID) => {
        // Make a server call here to send videoUrl and timer data
        var formdata = new FormData();
        formdata.append('url',url)
        formdata.append("comment", comment);
        formdata.append('u_id',uID)
       
        

        
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
      
        
            try {
                const response = await fetch(API_URLS.userComment, requestOptions);
                const result = await response.text();
                console.warn(result); // Logging the result received from the server
            } catch (error) {
                console.warn('error', error);
            }

        
        
    };
    const sendToServer_Query = async (query,uID) => {
        // Make a server call here to send videoUrl and timer data
        console.log(query)
        var formdata = new FormData();

        formdata.append("query", query);
        formdata.append('u_id',uID)
       

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(API_URLS.userQuery, requestOptions);
            const result = await response.text();
            console.warn(result); // Logging the result received from the server
        } catch (error) {
            console.warn('error', error);
        }
    };
    const sendToServer = async (videoUrl, timer ,uID) => {
        // Make a server call here to send videoUrl and timer data
        var formdata = new FormData();
        formdata.append("timer", timer);
        formdata.append("url", videoUrl);
        formdata.append('u_id', uID)


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(API_URLS.userInterest, requestOptions);
            const result = await response.text();
            
        } catch (error) {
            console.warn('error', error);
        }
    };

    const goBack = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
        }
    };

    const goForward = () => {
        if (webViewRef.current) {
            webViewRef.current.goForward();
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://www.youtube.com' }}
                javaScriptEnabled={true}
                onMessage={handleMessage}
                onNavigationStateChange={handleNavigationStateChange}
                injectedJavaScript={injectJavaScriptOnLoad}
            />

            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={goBack} style={styles.button}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goForward} style={styles.button}>
                    <Text>Forward</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    button: {
        width: Dimensions.get('window').width / 2,
        padding: 10,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default YoutubeViewScreen;