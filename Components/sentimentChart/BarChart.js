// EmotionChart.js

import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const EmotionChart = ({ data, colors, radius }) => {
  const total = data.reduce((acc, val) => acc + val, 0);
  let startAngle = 0;
  let endAngle = 0;

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2}>
        <G x={radius} y={radius}>
          {data.map((value, index) => {
            endAngle = startAngle + (value / total) * Math.PI * 2;
            const x1 = radius * Math.cos(startAngle);
            const y1 = radius * Math.sin(startAngle);
            const x2 = radius * Math.cos(endAngle);
            const y2 = radius * Math.sin(endAngle);
            const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

            const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            startAngle = endAngle;

            return <Path key={index} d={path} fill={colors[index % colors.length]} />;
          })}
        </G>
      </Svg>
    </View>
  );
};

export default EmotionChart;
