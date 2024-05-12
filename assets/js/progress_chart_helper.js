export function calculateAverages(dataArray) {
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