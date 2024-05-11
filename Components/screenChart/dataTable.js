import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,Dimensions,Linking} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const ScreenTimeTable = (prop) => {
const urlVisits = prop.data
  /*const urlVisits = [
    {"sec": "2", "timestamp": "Tue, 05 Mar 2024 07:48:08 GMT", "url": "https://m.youtube.com/"},
    {"sec": "147", "timestamp": "Tue, 07 Mar 2024 07:50:32 GMT", "url": "https://m.youtube.com/"},
    {"sec": "2", "timestamp": "Tue, 05 Mar 2024 07:50:35 GMT", "url": "https://m.youtube.com/#menu"},
    {"sec": "3", "timestamp": "Tue, 05 Mar 2024 07:50:38 GMT", "url": "https://m.youtube.com/https://m.youtube.com/https://m.youtube.com/"}
  ];*/

  // Initialize state for tracking visibility of child rows for each parent row
  const [showChildren, setShowChildren] = useState({});
  
  // Function to toggle the visibility of child rows for a specific parent row
  const toggleChildren = (date) => {
    setShowChildren({
      ...showChildren,
      [date]: !showChildren[date]
    });
  };
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  // Calculate total URL visits and total spend time for each date
  const dateInfo = urlVisits.reduce((acc, visit) => {
    const date = new Date(visit.timestamp).toLocaleDateString();
    acc[date] = acc[date] || { visits: 0, spend: 0 };
    acc[date].visits++;
    acc[date].spend += parseInt(visit.sec, 10);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.table}>
        {/* Rows */}
        {Object.entries(dateInfo).map(([date, info]) => (
          <View key={date}>
            <TouchableOpacity onPress={() => toggleChildren(date)}>
            <View style={[styles.row, styles.parentRow]}>
  {/* Date column */}
  <View style={styles.column}>
    <Text style={styles.parentText}>Date: {date}</Text>
  </View>
  
  {/* URL visits column */}
  <View style={styles.column}>
    <Text style={styles.parentText}>Url Visit: {info.visits}</Text>
  </View>
  
  {/* Spend time column */}
  <View style={styles.column}>
    <Text style={styles.parentText}>Spend: {info.spend} sec</Text>
  </View>
  
  {/* Arrow column */}
  <Text style={styles.arrow}>{showChildren[date] ? '▼' : '►'}</Text>
</View>
            </TouchableOpacity>
            {showChildren[date] && (
  urlVisits
    .filter(visit => new Date(visit.timestamp).toLocaleDateString() === date) // Filter based on date
    .map((visit, index) => (
      <View key={index} style={[styles.row, styles.childRow]}>
  {/* Timestamp column */}
  <View style={styles.column}>
    <Text style={styles.childText}>{visit.timestamp}</Text>
  </View>

  {/* Seconds column */}
  <View style={styles.column}>
    <Text style={styles.childText}>{visit.sec} sec</Text>
  </View>

  {/* URL column */}
  <View style={[styles.column, styles.urlColumn]}>
    <TouchableOpacity onPress={() => handlePress(visit.url)}>
      <Text style={styles.urlText} numberOfLines={1} ellipsizeMode="tail">
        {visit.url}
      </Text>
    </TouchableOpacity>
  </View>
</View>

    ))
)}
          </View>
        ))}
        {/* Add a dummy view to create space at the bottom */}
        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  column: {
    flex: 1,
    justifyContent: 'center', // Center text vertically
  },
  urlColumn: {
    flex: 2, // Make URL column twice as wide
  },
  table: {
    width:windowWidth-20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 100, // Adjust padding bottom to accommodate dummy view height
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginTop: 2
  },
  parentRow: {
    backgroundColor: '#3498db', // Modern web color
    borderBottomWidth: 0,
  },
  parentText: {
    fontWeight: 'bold',
    color: '#fff', // White color for text
  },
  arrow: {
    color: '#fff', // White color for arrow
  },
  childRow: {
    backgroundColor: '#fff',
  },
  childText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ScreenTimeTable;
