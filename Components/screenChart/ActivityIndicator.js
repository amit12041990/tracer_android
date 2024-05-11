import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

const ActivityChart = ({ data }) => {
  return (
    <View style={styles.container}>
      <VictoryChart width={350} height={300} padding={{ top: 20, bottom: 50, left: 50, right: 20 }}>
        {/* X-axis */}
        <VictoryAxis
          tickFormat={(x) => `${new Date(x).toLocaleTimeString()}`} // Format ticks as time
          style={{
            axis: { stroke: "#756f6a" }, // Axis line color
            ticks: { stroke: "#756f6a" }, // Tick color
            tickLabels: { fontSize: 10, padding: 5 }, // Tick label style
          }}
        />
        {/* Y-axis */}
        <VictoryAxis
          dependentAxis // Use for Y-axis
          tickFormat={(y) => `${y} km`} // Format ticks as distance
          style={{
            axis: { stroke: "#756f6a" }, // Axis line color
            ticks: { stroke: "#756f6a" }, // Tick color
            tickLabels: { fontSize: 10, padding: 5 }, // Tick label style
          }}
        />
        {/* Line chart */}
        <VictoryLine
          data={data}
          x="time" // Access 'time' property for x-values (time)
          y="distance" // Access 'distance' property for y-values (distance)
          style={{
            data: { stroke: "#c43a31" }, // Line color
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default ActivityChart;
