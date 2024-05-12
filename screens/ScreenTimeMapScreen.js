import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
 import { LinearGradient } from 'expo-linear-gradient';

import ScreenTimeTable from '../Components/screenChart/dataTable';
import ScreenChartComponent from '../Components/screenChart/ScreenChart';
import { useSelector } from 'react-redux';
import { selectWordCloudData } from '../redux/wordCloudSlice';
import { useRoute } from '@react-navigation/native'; 



const ScreenTimeMapScreen = () => {

   const reduxStoreData = useSelector(selectWordCloudData);
   
    const screenChart_data = reduxStoreData[0].screenChart
    const screenChartData = mergeAndSerialise(screenChart_data);
    const { params } = useRoute();
    const { startDate, endDate } = params;

    // Check if screenChartData is null or empty
    if (!screenChartData || screenChartData.length === 0) {
        return (
            <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.viewTitle}>Activities</Text>
                        
                    </View>
                    <View style={{ marginTop:3 }}>
                            <Text style={styles.dateText}>From: {startDate}</Text>
                            <Text style={styles.dateText}>To: {endDate}</Text>
                    </View>
                    <View style={styles.tableContainer}>
                        <ScrollView style={{ flex: 1 }}>
                            <ScreenTimeTable data={screenChart_data} />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.viewTitle}>Activities</Text>
                    <View style={{ marginTop:3 }}>
                            <Text style={styles.dateText}>From: {startDate}</Text>
                            <Text style={styles.dateText}>To: {endDate}</Text>
                        </View>
                </View>
                <View style={styles.main}>
                   
                    <View style={styles.chartContainer}>
                        <ScreenChartComponent data={screenChartData} />
                    </View>
          
                    <View style={styles.tableContainer}>
                        <ScrollView style={{ flex: 1 }}>
                            <ScreenTimeTable data={screenChart_data} />
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );

};

// Helper function
const mergeAndSerialise = (data) => {
    function mergeData(data) {
        const mergedData = {};
        data.forEach(entry => {
            const timestamp = new Date(entry.timestamp).toISOString().split('T')[0]; // Extract date from timestamp
            if (!mergedData[timestamp]) {
                mergedData[timestamp] = parseInt(entry.sec);
            } else {
                mergedData[timestamp] += parseInt(entry.sec);
            }
        });
        return mergedData;
    }

    // Merge data based on timestamp
    const mergedData = mergeData(data);

    // Extract merged timestamps and sec values
    const timestamps = Object.keys(mergedData);
    const secValues = Object.values(mergedData);
    return [secValues, timestamps];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    main: {
        flex: 1,
        alignItems: 'center',
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
    dateText: {
        color: '#ffffff',
        marginRight: 10,
    },
    chartContainer: {
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    tableContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 10,
        padding: 10,
        maxHeight: 500,
    },
});

export default ScreenTimeMapScreen;
