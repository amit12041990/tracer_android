import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URLS } from './api';
const ChromeViewScreen = ({ navigation }) => {
    const webViewRef = useRef(null);
    const [timer, setTimer] = useState(0);
    const [url_address, setUrl_address] = useState('');
    const [url_search_data, set_url_search_data] = useState('');
    const [url_search, set_url_search] = useState('');
    const [userId, setUserId] = useState('')



    
    const [intervalId, setIntervalId] = useState(null);
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

    const injectJavaScriptOnLoad = `
  var elapsedTime = 0;
  var intervalId = null;
  var currentUrl = window.location.href;

  function postVideoData() {
      const url_address = window.location.href;
      window.ReactNativeWebView.postMessage(
          JSON.stringify({
              eventType: 'url_address',
              url: url_address, // Use the correct variable here (url_address)
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
`;


    const handleScrape = () => {
        webViewRef.current.injectJavaScript(`
   
            const url = window.location.href; // Get current URL
            const title = document.title; // Get document title

            const queryElement = document.querySelector('input[name="q"]');
            const query = queryElement ? queryElement.value : null; // Get search query if input field with name 'q' exists

            const scrapedData = {
                eventType:'search',
                url: url,
                title: title,
                query: query
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(scrapedData));
        `);
    };

    const handleNavigationStateChange = (newNavState) => {
        // Call the scraping function when navigation state changes
        const { url, navigationType } = newNavState;
        sendToServer_query(url_search_data, url_search,userId)
        sendToServer_timer(url_address,timer,userId)
        if (newNavState.loading === false) {
            // Ensure the page is fully loaded before scraping
            handleScrape();
        }
     

        // Prevent _blank links from opening externally
    if (navigationType === 'click' && url) {
        // If the clicked link is supposed to open in a new window/tab (_blank),
        // open it in the same WebView instead
        if (url.includes('w3schools.com/')) {
            // Handle W3Schools "Try it Yourself" links
            webViewRef.current.injectJavaScript(`window.location.href = "${url}";`);
            return false; // Prevent the link from opening in default browser
        } else {
            // Handle other _blank links
            webViewRef.current.injectJavaScript(`window.open("${url}", "_self");`);
            return false; // Prevent the link from opening in default browser
        }
    }
        return true; 
        
    };

    const handleMessage = (event) => {
        const scrapedData = JSON.parse(event.nativeEvent.data);
        //console.log(JSON.stringify(scrapedData))
        if (scrapedData.eventType === 'url_address') {
            setTimer(scrapedData.elapsedTime)
            setUrl_address(scrapedData.url)
            

        }
        if (scrapedData.eventType === 'search') {
            set_url_search(scrapedData.query);
            set_url_search_data(scrapedData.title)
        }
       

    };
    const sendToServer_query = async (query, url,userId) => {
        // Make a server call here to send videoUrl and timer data
        var formdata = new FormData();
        formdata.append("query", query);
        
        formdata.append("url", url);
        formdata.append("u_id",userId)

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(API_URLS.userSearch, requestOptions);
            const result = await response.text();
            console.warn(result); // Logging the result received from the server
        } catch (error) {
            //console.warn('error', error);
        }
    };
    const sendToServer_timer = async (url, timer,userId) => {
        // Make a server call here to send videoUrl and timer data
        var formdata = new FormData();
        formdata.append("url", url);
        formdata.append("timer", timer);
        formdata.append("u_id",userId)

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            const response = await fetch(API_URLS.userInterestChrome, requestOptions);
            const result = await response.text();
            console.warn(result); // Logging the result received from the server
        } catch (error) {
            //console.warn('error', error);
        }
    };
    const goBack = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack(); // Go back in WebView history
        }
    };

    const goForward = () => {
        if (webViewRef.current) {
            webViewRef.current.goForward(); // Go forward in WebView history
        }
    };

    return (
        <View style={styles.container}>
            {/* Back and Forward navigation buttons */}
           

            {/* WebView */}
            <WebView
    ref={webViewRef}
    source={{ uri: 'https://www.google.com' }} // Replace with your desired URL
    style={styles.webview}
    javaScriptEnabled={true}
    onMessage={handleMessage}
    onNavigationStateChange={handleNavigationStateChange}
    injectedJavaScript={injectJavaScriptOnLoad}
   
/>

            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => goBack()} style={styles.button}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goForward()} style={styles.button}>
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
        width: (Dimensions.get('window').width)/2,
        padding: 10,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems:'center'
    },
    webview: {
        flex: 1,
    },
});
export default ChromeViewScreen;
