import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

import { TagCloud } from 'react-tagcloud/rn';
import { Dimensions } from 'react-native';


const calculatePercentile = (data_objects) => {
  // Calculate the total count
  const totalCount = data_objects.reduce((sum, obj) => sum + obj.count, 0);

  // Calculate percentile for each object
  data_objects.forEach(obj => {
      obj.percentile = Math.floor(((obj.count / totalCount) * 100) * 35);
  });

  return data_objects;
};



const SimpleCloud = ({ handleTagInfo,data_objects }) => {


    tagData = calculatePercentile(data_objects)

  const [selectedTag, setSelectedTag] = useState(null);
 





  const handleTagPress = (tag) => {
    setSelectedTag(tag);
    handleTagInfo(tag); // Pass the selected tag to the parent component
    
  };

  

  return (

      
      <TouchableOpacity onPress={() => setSelectedTag(null)}>

      <TagCloud
        minSize={15}
        maxSize={30}
        
        tags={data_objects}
        onPress={handleTagPress}
        containerStyle={styles.tagCloudContainer}
      />

  </TouchableOpacity>
     

  );
};



const styles = StyleSheet.create({
 
  card: {
  width: Dimensions.get('window')
  },
  

  infoText: {
    fontSize: 16,
    padding: 10,
  },
  tableContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default SimpleCloud;
