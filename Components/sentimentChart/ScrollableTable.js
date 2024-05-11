import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Table = ({ data }) => {
  return (
    <LinearGradient
      colors={['#F0F0F0', '#E0E0E0']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.card}
    >
      <View style={styles.row}>
        <Text style={[styles.cell, styles.cellText]}>
          {data.timestamp}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.cellText, { fontSize: 20, fontWeight: 'bold' }]}>
          {data.comment}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.cellText]}>{data.tonality}</Text>
        <Text style={[styles.cell, styles.cellText]}>{data.emotion}</Text>
      </View>
      <View style={styles.row}>
        <Button title="Open URL" onPress={() => { /* handle URL opening */ }} />
      </View>
    </LinearGradient>
  );
};

const ScrollableTable = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.cell]}>Sentiments</Text>
      </View>
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        {/* Table Rows */}
        {data.map((element, index) => {
          return <Table key={index} data={element} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  cellText: {
    textAlign: 'left',
  },
});

export default ScrollableTable;
