import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';
import { calculateAverages } from '../../assets/js/progress_chart_helper';
const ProgressIndicator = (prop) => {
    const data = prop.grammerCommentData
    const averages = calculateAverages(data)
    const { averageFluent, averageGrammarMistakeCount, averageImpression, averageSpellMistakeCount } = averages;
    const progressResult = (averageFluent+averageGrammarMistakeCount+averageSpellMistakeCount)/3
    return (
        <LinearGradient colors={['#3498db', '#ffffff']} style={styles.gradient}>
            <View style={styles.container}>
                <CircularProgress
                    
                    value={progressResult}
                    radius={75}
                    duration={2000}
                    progressValueColor={'#ecf0f1'}
                    maxValue={200}
                    title={'%'}
                    titleColor={'white'}
                    titleStyle={{fontWeight: 'bold'}}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        
        flex: 1,
        width:Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default ProgressIndicator;
