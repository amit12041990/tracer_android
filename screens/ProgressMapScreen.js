import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import Table from '../Components/progressChart/DataTable';
import ProgressChartBar from '../Components/progressChart/ProgressChart';
import ProgressIndicator from '../Components/progressChart/SingleProgressChart';
import { useSelector } from 'react-redux';
import { selectWordCloudData } from '../redux/wordCloudSlice';
import Tooltip_Table from '../Components/Tooltip';

const windowWidth = Dimensions.get('window').width;
import { useRoute } from '@react-navigation/native';

const ProgressMapScreen = () => {
    const reduxStoreData = useSelector(selectWordCloudData);
   // const [{ grammarChart, screenChart, tonaliChart, wordcloudChart }] = reduxStoreData;
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
                    <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                    <View style={{ marginTop:3}}>
                            <Text style={styles.dateText}>From: {startDate}</Text>
                            <Text style={styles.dateText}>To: {endDate}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.main}>
                    {/* Progress Chart Section */}
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
                    {/* Table Section */}
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
