import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataDisplay = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={[styles.cell, styles.headerCell]}>
            <Text>Date</Text>
          </View>
          <View style={[styles.cell, styles.headerCell]}>
            <Text>Message</Text>
          </View>
          <View style={[styles.cell, styles.headerCell]}>
            <Text>Tonality</Text>
          </View>
          <View style={[styles.cell, styles.headerCell]}>
            <Text>Emotion</Text>
          </View>
          <View style={[styles.cell, styles.headerCell]}>
            <Text>URL</Text>
          </View>
          <View style={[styles.cell, styles.headerCell]}>
            <Text>Button</Text>
          </View>
        </View>

        {data.flat().map((item, index) => (
          <View key={index} style={styles.row}>
            <View style={[styles.cell, index < 2 ? styles.fullWidth : styles.halfWidth]}>
              <Text>Date Value</Text>
            </View>
            <View style={[styles.cell, index < 2 ? styles.fullWidth : styles.halfWidth]}>
              <Text>{item.comments[0].comment}</Text>
            </View>
            <View style={[styles.cell, styles.halfWidth]}>
              <Text>{item.comments[0].tonality}</Text>
            </View>
            <View style={[styles.cell, styles.halfWidth]}>
              <Text>{item.comments[0].emotion}</Text>
            </View>
            <View style={[styles.cell, styles.halfWidth]}>
              <Text>{item.comments[0].url}</Text>
            </View>
            {index === data.flat().length - 1 && (
              <View style={[styles.cell, styles.halfWidth, styles.buttonContainer]}>
                <Text style={styles.buttonText}>Click Me</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  cell: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    backgroundColor: 'lightgray',
  },
  fullWidth: {
    flex: 1,
  },
  halfWidth: {
    flex: 0.5,
  },
  buttonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default DataDisplay;
