import React, { useState, useEffect } from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CircularMenu = () => {
  const { params } = useRoute();
  const { startDate, endDate } = params;

  

  return (
    <View style={styles.container}>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
  },
  menuItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80, // Adjust the size of menu items as needed
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CircularMenu;
