import React from 'react';
import { View, ActivityIndicator, StyleSheet ,Text} from 'react-native';

const Loader = (prop) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text>{prop.msg === "" ? "Empty Message" : prop.msg}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999, // Ensure it overlays other components
  },
});

export default Loader;
