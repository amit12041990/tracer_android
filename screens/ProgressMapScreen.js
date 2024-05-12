import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import Table from '../Components/progressChart/DataTable';
import ProgressChartBar from '../Components/progressChart/ProgressChart';
import ProgressIndicator from '../Components/progressChart/ProgressIndicator';
import { useSelector } from 'react-redux';
import { selectWordCloudData } from '../redux/wordCloudSlice';

import { useRoute } from '@react-navigation/native';

const ProgressMapScreen = () => {
  
    const reduxStoreData = useSelector(selectWordCloudData);

    const {grammarChart} = reduxStoreData[0]
    const { params } = useRoute();
    const { startDate, endDate } = params;
  

    if (!grammarChart || grammarChart.length === 0) {
        return (
            <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.viewTitle}>Text Evaluation</Text>
                        <View style={{ marginTop:3}}>
                            <Text style={styles.dateText}>From: {startDate}</Text>
                            <Text style={styles.dateText}>To: {endDate}</Text>
                        </View>
                    </View>
                    <View style={styles.main}>
                        <Text>No data available for grammar chart</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    const data = [
    
    ];

    return (
        <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.viewTitle}>Text Evaluation</Text>
                  
                    
                   
                </View>
                <View style={{ marginTop:3}}>
                            <Text style={styles.dateText}>From: {startDate}</Text>
                            <Text style={styles.dateText}>To: {endDate}</Text>
                        </View>
                <View style={styles.main}>
                   
                    <View style={styles.chartContainer}>
                        <Swiper loop={false} showsPagination={true}>
                            <View style={styles.slide}>
                                <ProgressChartBar grammerCommentData={grammarChart} />
                            </View>
                            <View style={styles.slide}>
                                <ProgressIndicator grammerCommentData={grammarChart} />
                            </View>
                        </Swiper>
                    </View>
        
                    <View style={styles.tableContainer}>
                        <ScrollView style={{ flex: 1 }}>
                            <Table tabledata={grammarChart} />
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
   
  

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
        height: 200,
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 2,
        backgroundColor: '#ffffff',
        padding: 2,
    },
    tableContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 10,
   
        maxHeight: 500,
        
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProgressMapScreen;
