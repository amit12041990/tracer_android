import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const PrgoressCirc = (props)=>{
    const tabledata2=props.data
    //const {value,type}=data
    console.log(tabledata2)
    return(
        <CircularProgress
  value={tabledata2.value}
  title={tabledata2.type}
  radius={50}
  activeStrokeColor={'#2465FD'}
  activeStrokeSecondaryColor={'#C25AFF'}
  
/>
    )
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressTables: {
    backgroundColor: '#40E0D0',
    borderRadius: 1,
    padding: 10,
    marginBottom: 2,
  
   
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  content: {
    fontSize: 16,
    fontWeight: 'bold',
    // Center the text horizontally
  },
});

const Grid = () => {
  return (
    <View style={[styles.progressTables]}>
      <View style={styles.innerContainer}>
        <View style={[styles.progressTables,]}>
          
          <PrgoressCirc data={{'value':59,'type':'spell pass'}}/>
        </View>
        <View style={[styles.progressTables,]}>
        <PrgoressCirc data={{'value':90,'type':'Grammar pass'}}/>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <View style={[styles.progressTables,]}>
        <PrgoressCirc data={{'value':81,'type':'Fluency'}}/>
        </View>
        <View style={[styles.progressTables, ]}>
        <PrgoressCirc data={{'value':32,'type':'Impression'}}/>
        </View>
      </View>
    </View>
  );
};

export default Grid;
