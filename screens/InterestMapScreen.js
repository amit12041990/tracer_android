import React, { useState,useRef,useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute,useNavigation } from '@react-navigation/native';

import TagSummary from '../Components/wordCloudChart/TagTable'; // Corrected component name

import SimpleCloud from '../Components/wordCloudChart/SimpleCloud';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { selectWordCloudData } from '../redux/wordCloudSlice';
import { useSelector } from "react-redux";
import { calculateSum } from '../assets/js/wordcloud_helper';

const InterestMapScreen = () => {
  const navigation =useNavigation()
    const scrollViewRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (scrollViewRef.current && contentHeight > 0) {
      scrollViewRef.current.setNativeProps({
        maxHeight: Math.min(contentHeight, 250) // Adjust 250 as needed
      });
    }
  }, [contentHeight]);
    const { params } = useRoute();
    const { startDate, endDate } = params;
    const reduxStoreData = useSelector(selectWordCloudData);
    const { wordcloudChart } = reduxStoreData[0];
    const data_objects = wordcloudChart[0];
   
    
    data_objects.forEach(item=>{
        if (item && typeof item === 'object' && 'keyword' in item){
          item.value=item.keyword
        }
      })
  
    
   
 
      

    const data_object_afterfilter = data_objects.filter(item => typeof item === 'object' && item !== null && Object.values(item).every(val => val !== NaN ));
    const data_objects_sums = calculateSum(data_object_afterfilter)


  

    const handleTagSelection = (tag) => {
        setTagObjectValue(tag);
    };
    const [selectedTag, setSelectedTag] = useState(null);

    const handleTagInfo = (tag) => {
        setSelectedTag(tag);
    };



    return (
        <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
              <Text style={styles.viewTitle}>Interest Map</Text>
             
            </View>
                <View style={styles.dateContainer}>
                        <Text style={{color:'white'}}>From : {startDate}</Text>
                        <Text style={{color:'white'}}>  : {endDate}</Text>
                </View>
                {/* Word Cloud Section */}
                <TagSummary tagValue={data_objects_sums} /> 
                <ScrollView ref={scrollViewRef}
                style={{marginTop:5,backgroundColor:'white'}}
      onContentSizeChange={(contentWidth, contentHeight) => {
        setContentHeight(contentHeight);
      }}>
                    <SimpleCloud handleTagInfo={handleTagInfo} data_objects={data_object_afterfilter}/>
                </ScrollView>
                {/* Render tag info here */}
                {selectedTag && (
                   <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16,marginTop:5 }}>
                   <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                     Selected Tag Details
                   </Text>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                     <Text style={{ fontSize: 16, color: '#333' }}>Time:</Text>
                     <Text style={{ fontSize: 16 }}>{selectedTag.count}</Text>
                   </View>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                     <Text style={{ fontSize: 16, color: '#333' }}>Tag:</Text>
                     <Text style={{ fontSize: 16 }}>{selectedTag.value}</Text>
                   </View>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                     <Text style={{ fontSize: 16, color: '#333' }}>Pages:</Text>
                     <Text style={{ fontSize: 16 }}>{selectedTag.pages}</Text>
                   </View>
                 </View>
                )}
              
               
            
                
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
       
        paddingTop: 5,
    },
    header: {
      flexDirection: "row", // Arrange items horizontally
      justifyContent: "space-between", // Space between items
      alignItems: "center", // Center items vertically
      height: 60,
      marginTop: 2,
      backgroundColor: "transparent",
      padding: 5,
     
    },
    viewTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#ffffff",
      textTransform: "uppercase",
    },
    logoutButton: {
      backgroundColor: "#ffffff",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
  
    logoutText: {
      color: "#3498db",
      fontWeight: "bold",
    },
  
    dateContainer: {
        color:'white',
        marginTop: 5,
        
    },
    wordCloudContainer: {
       
        maxHeight:400
    },
});

export default InterestMapScreen;
