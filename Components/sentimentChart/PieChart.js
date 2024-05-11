import React, { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;

const DonutChart = (props) => {
  const dataArray =props.data

  const [clickedSliceData, setClickedSliceData] = useState(null);

  const data1 = dataArray.map(obj => {
    const emoData = obj.emo;
    return emoData[0].map((emo, index) => ({
      x: emo,
      y: emoData[1][index]
    }));
  });
  
  const data2 = dataArray.map(obj => {
    const tonData = obj.ton;
    return tonData[0].map((ton, index) => ({
      x: ton,
      y: tonData[1][index]
    }));
  });

  const handleDataClick1 = (data) => {
    setClickedSliceData(data);
  };

  const handleDataClick2 = (data) => {
    setClickedSliceData(data);
  };

  return (
    <View style={{height:250}}>
      <Swiper
        style={{ height:200 }}
        loop={false} // Disable looping to prevent automatic sliding to the next chart
        paginationStyle={{ bottom: 5 }} // Adjust the bottom position of the pagination icons
      >
        <View>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Tonality</Text>
          <VictoryPie
            data={data1[0]}
            height={175}
            innerRadius={70}
            labelRadius={50}
            colorScale={["#FF5733", "#FFC300", "#DAF7A6", "#C70039", "#900C3F"]}
            events={[{
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [{
                    target: "data",
                    mutation: (props) => handleDataClick1(props.datum)
                  }];
                }
              }
            }]}
          />
        </View>
        <View>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Emotion</Text>
          <VictoryPie
            data={data2[0]}
            height={175}
            innerRadius={70}
            labelRadius={50}
            colorScale={["#FF5733", "#FFC300", "#DAF7A6"]}
            events={[{
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  return [{
                    target: "data",
                    mutation: (props) => handleDataClick2(props.datum)
                  }];
                }
              }
            }]}
          />
        </View>
      </Swiper>
      {clickedSliceData && (
  <View style={{ width:screenWidth , backgroundColor: '#f0f0f0', padding: 5 ,}}>
        <Text>{clickedSliceData.x}:</Text>
        <Text>{clickedSliceData.y}</Text>
    
      
 
  </View>
)}
    </View>
  );
};

export default DonutChart;
