import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SemiDonutChart from './SemiDonutChart';

const Table = (props) => {
  const data = props.tabledata;

  return (
    <View style={styles.container}>
      {/* Header */}
      
      {/* Data */}
      <ScrollView style={styles.dataContainer}>
        

        {data.map((rowData, index) => (
          <DataRow key={index} rowData={rowData} />
        ))}
      </ScrollView>
    </View>
  );
};

const HeaderCell = ({ text }) => (
  <View style={styles.headerCell}>
    <Text style={styles.cellText}>{text}</Text>
  </View>
);

const DataRow = ({ rowData }) => (
  <View style={{backgroundColor:'white'}}>
  <View style={styles.header}>
  <HeaderCell text={rowData['time']} />
</View>
<View name="textfield" style={[{flex:1,justifyContent:"center",alignItems:"center", textAlign:"center",backgroundColor:"#FFFFE0"},{width:windowWidth}]}>
      <Text style={styles.content}>{rowData['comment']}</Text>
</View>
<SemiDonutChart  data = {[rowData['spell_mistake_count'],rowData['grammar_mistake_count'],rowData['fluent'],rowData['impression']]}/>
  <ScrollView horizontal={true}>
   
    <View style={styles.dataRow}>
    <DataCell text={rowData['misspelled_words']} />
      <DataCell text={rowData['grammar_mistakes']} />
      <DataCell text={rowData['correct_comment']} />
      
    </View>
  </ScrollView>
  </View>
);

const DataCell = ({ text }) => (
  <View style={styles.dataCell}>
    <View style={styles.card}>
      <Text style={styles.cellText}>{text}</Text>
    </View>
  </View>
);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWidth = 350;
const cardHeight = 100;

const styles = StyleSheet.create({
  container: {
   
    width: windowWidth ,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    backgroundColor: '#AED6F1',
    padding: 10,
  },
  dataContainer: {
    maxHeight: windowHeight - 400, // Adjust height as needed
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dataCell: {
    width: cardWidth,
    height: cardHeight,
    padding: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    height: '100%',
    elevation: 2, // For Android shadow effect
    shadowColor: '#000', // For iOS shadow effect
    shadowOpacity: 0.25, // For iOS shadow effect
    shadowRadius: 3.84, // For iOS shadow effect
  },
  cellText: {
    textAlign:"left"
  },
  msgCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F5F5F5', // Light gray
    borderWidth: 1,
    borderColor: '#E0E0E0', // Lighter gray
    marginTop: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#333333', // Dark gray
  },
});


export default Table;
