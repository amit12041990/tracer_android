import React from 'react';
import { View,Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const SemiDonutChart = (props) => {
  
  return (
    <View style={{ alignItems: 'center',height:250 }}>
   

    
  
      <VictoryPie
        data={[
          { x: 'Spell ', y: props.data[0] },
          { x: 'Grammer', y: props.data[1] },
          { x: 'Fluent', y: props.data[2] },
          { x: 'Impression', y: props.data[3] },
          
        ]}
        innerRadius={100}
        labelRadius={135}
        startAngle={-90}
        endAngle={90}
        animate={{ duration: 1000 }}
        style={{
          data: {
            fill: ({ datum }) => {
              // Custom fill colors for each data point
              switch (datum.x) {
                case 'Spell':
                  return 'tomato';
                case 'Grammer':
                  return 'orange';
                case 'Fluent':
                  return 'gold';
                case 'Impression':
                  return 'skyblue';
                default:
                  return 'lightgreen';
              }
            },
          },
          labels: {
            fill: 'white',
            fontSize: 16,
          },
        }}
      /> 
    </View>
  );
};

export default SemiDonutChart;
