import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';

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
function calculateAverages(dataArray) {
    // Initialize variables to store the sum of values
    console.log(dataArray)
    let totalGrammarMistakeCount = 0;
    let totalSpellMistakeCount = 0;
    let totalImpression = 0;
    let totalFluent = 0;

    // Iterate over each object in the array and sum up the required values
    dataArray.forEach(item => {
        totalGrammarMistakeCount += item.grammar_mistake_count;
        totalSpellMistakeCount += item.spell_mistake_count;
        totalImpression += item.impression;
        totalFluent += item.fluent;
    });

    // Calculate the average
    const totalCount = dataArray.length;
    const averageGrammarMistakeCount = totalGrammarMistakeCount / totalCount;
    const averageSpellMistakeCount = totalSpellMistakeCount / totalCount;
    const averageImpression = totalImpression / totalCount;
    const averageFluent = totalFluent / totalCount;

    // Return an object containing the averages
    return {
        averageGrammarMistakeCount,
        averageSpellMistakeCount,
        averageImpression,
        averageFluent
    };
}

export default ProgressIndicator;
