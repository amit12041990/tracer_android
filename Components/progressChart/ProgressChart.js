import React from 'react';
import { View, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const windowWidth = Dimensions.get('window').width;

const ProgressChartBar = (props) => {
    const screenWidth = Dimensions.get('window').width;
    //const languageAccuracy_data = [{"comment": "my mahadev is great", "correct_comment": "My made is great", "correct_words": "my is great", "correction": "{'UPPERCASE_SENTENCE_START': 'My'}", "fluent": 40, "grammar_mistake_count": 75, "grammar_mistakes": "['UPPERCASE_SENTENCE_START']", "impression": 81.245, "misspelled_words": "{'mahadev'}", "spell_mistake_count": 75, "time": "Wed, 06 Mar 2024 09:20:21 GMT"}]
    
    const averages = calculateAverages(props.grammerCommentData)
    const { averageFluent, averageGrammarMistakeCount, averageImpression, averageSpellMistakeCount } = averages;
    const data = {
        labels: ["Grammar", "Spell", "Fluency"],
        data: [averageGrammarMistakeCount/100, averageSpellMistakeCount/100, averageFluent/100],
        colors: ['#FF7F50', '#00FF00', '#1E90FF']
    };
   

    const chartConfig = {
        backgroundGradientTo: '#3498db', // Dark background color
        backgroundGradientFrom: '#ffffff', // Slightly lighter background color
        color: (opacity = 1) => `rgba(90, 255, 255, ${opacity})`,
      
        
       
    };

    return (
        <View style={{alignItems: 'center', borderRadius: 10, overflow: 'hidden',marginTop: 5,}}>
            <ProgressChart
                data={data}
                width={screenWidth } // Adjust width here
                height={200}
                strokeWidth={8}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={false}
                withCustomBarColorFromData
               
               
            />
        </View>
    );
};
function calculateAverages(dataArray) {
    // Initialize variables to store the sum of values
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



export default ProgressChartBar;
