const Stack = createNativeStackNavigator();

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';




import ScrollableTable from "../Components/sentimentChart/ScrollableTable";
import DonutChart from "../Components/sentimentChart/PieChart";


import {selectWordCloudData} from '../redux/wordCloudSlice'
import DataDisplay from "../Components/sentimentChart/DataTable";
import { useRoute } from "@react-navigation/native";

const EmotionMapScreen = () => {
  const { params } = useRoute();
    const { startDate, endDate } = params;
  
  const reduxStoreData = useSelector(selectWordCloudData)

  const tonalityChart = reduxStoreData[0].tonaliChart
  const data1 = tonalityChart[0]
  const data = tonalityChart[1]

  

 

 

  const handleLogout = () => {};

  return (
  
      <SafeAreaView style={{flex:1}}>
         <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
        <View style={styles.main}>
          {/* Header Section*/}
          <View style={styles.header}>
                    <Text style={styles.viewTitle}>Sentiment</Text>
                    <View style={{ marginTop:2}}>
                        <Text style={styles.dateText}>From: {startDate}</Text>
                        <Text style={styles.dateText}>To: {endDate}</Text>
                    </View>
                </View>

          {/* Menu Section*/}
          <View
            style={{
              width: windowWidth,
            
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 5,
              justifyContent: "center",
              alignSelf: "center",

            }}
          ><DonutChart data={data1}/>
          </View>
   <ScrollableTable data={data}/> 
        
          <View
            style={{
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 5,
            }}
          >
            
          </View>
        </View>
        </LinearGradient>
      </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
  menu: {
    width: windowWidth - 20,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 5,
    display: "flex",
    zIndex: 1,
    border: "2px solid #C9E3F5",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#C9E3F5",
  },
 
  main: {
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
},
viewTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
},
dateText: {
    color: '#ffffff',
    marginRight: 10,
},
  
  buttonText: {
    color: "#3498db",
  },
 
});
export default EmotionMapScreen;
